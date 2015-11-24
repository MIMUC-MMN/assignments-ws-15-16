<?php

use views\helpers\PathHelper;
require_once(dirname(dirname(__FILE__)) . '/views/helpers/PathHelper.php');
$path = new PathHelper();

require_once($path->getModelPath() . 'Note.php');
require_once($path->getModelPath() . 'User.php');

class DBHandler{
    var $connection;

    /**
     * @param $host String host to connect to.
     * @param $user String username to use with the connection. Make sure to grant all necessary privileges.
     * @param $password String password belonging to the username.
     * @param $db String name of the database.
     */
    function __construct($host,$user,$password,$db){
        $this->connection = new mysqli($host,$user,$password,$db);
        $this->connection->set_charset('utf8'); // prevent charset errors.
        $this->ensureUsersTable();
        $this->ensureNotesTable();
    }

    function ensureUsersTable(){
        assert($this->connection);
        $queryString =  "CREATE TABLE IF NOT EXISTS users (id INT(5) PRIMARY KEY AUTO_INCREMENT, ".
                        "name VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)";
        // it's okay not to use prepared statements here
        // because it is quite a static thing to do and does not take potentially harmful user input.
        $this->connection->query($queryString);
    }

    function insertUser($userName, $password){
        assert($this->connection);
        $queryString = "INSERT INTO users (`name`,`password`) VALUES (?,?)";
        $statement = $this->connection->prepare($queryString);
        $statement->bind_param("ss",$userName,$password);
        return $statement->execute();
    }

    function queryUserByUserName($userName){
        assert($this->connection);
        $queryString = "SELECT `id`,`name`,`password` AS `hash` FROM `users` WHERE `name`=?";
        $statement = $this->connection->prepare($queryString);
        $statement->bind_param("s",$userName);
        $statement->execute();
        $statement->bind_result($id,$name,$hash);
        $statement->fetch();
        return new User($id, $name, $hash);
    }

    function ensureNotesTable(){
        // TODO
        assert($this->connection);
        $queryString =  "CREATE TABLE IF NOT EXISTS notes (id INT(5) PRIMARY KEY AUTO_INCREMENT, ".
            "title VARCHAR(255), content TEXT(255) NOT NULL, user INT(5) NOT NULL,".
            "FOREIGN KEY fk_user(user) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE)";
        $this->connection->query($queryString);
    }

    function insertNote($title, $content, $userid){
        assert($this->connection);
        if(strlen($content)>0){
            $queryString = "INSERT INTO notes (`title`,`content`,`user`) VALUES(?,?,?)";
            $statement = $this->connection->prepare($queryString);
            $statement->bind_param("ssi",$title,$content,$userid);
            $statement->execute();
            return $this->connection->insert_id;
        }
        else{
            return false;
        }
    }

    function deleteNote($noteId){
        assert($this->connection);
        $queryString = "DELETE FROM notes WHERE `id` = ?";
        $statement = $this->connection->prepare($queryString);
        $statement->bind_param("i", $noteId);
        return $statement->execute();
    }

    function getNotesForUser($userId){
        if(!isset($userId)){
            $userId = $_SESSION['userId'];
        }
        if(!isset($userId)) return array();

        $queryString = "SELECT id, title, content FROM notes WHERE `user`=?";
        $statement = $this->connection->prepare($queryString);
        $statement->bind_param("i",$userId);
        $statement->execute();
        $result = array();
        $statement->bind_result($id, $title, $content);
        while($statement->fetch()){
            $result[] = new Note($id,$title,$content);
        }
        return $result;
    }

}