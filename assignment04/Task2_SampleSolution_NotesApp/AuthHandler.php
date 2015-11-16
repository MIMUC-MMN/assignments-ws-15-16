<?php
require_once('DBHandler.php');
define('authSessionKey','isAuthenticated');

class AuthHandler{

    var $dbHandler;

    /**
     * AuthHandler constructor.
     * @param $dbHandler DBHandler
     */
    function __construct($dbHandler){
        $this->dbHandler = $dbHandler;
    }

    function registerUser($userName,$password){
        $hash = password_hash($password,PASSWORD_DEFAULT);
        return $this->dbHandler->insertUser($userName,$hash);
    }

    function loginUser($userName,$password){
        $userInfo = $this->dbHandler->queryUserByUserName($userName);
        $passwordVerificationResult = password_verify($password,$userInfo['hash']);
        if($passwordVerificationResult){
            $_SESSION[authSessionKey] = true;
            $_SESSION['userName'] = $userInfo['name'];
            $_SESSION['userId'] = $userInfo['id'];
            return true;
        }
        else return false;
    }

    function isUserLoggedIn(){
        return isset($_SESSION[authSessionKey]) && $_SESSION[authSessionKey];
    }

    /**
     * @return string the user name or empty if the user is not logged in.
     */
    function getUserName(){
        return isset($_SESSION['userName']) ? $_SESSION['userName'] : "";
    }

    /**
     * @return int the user's id, which can serve as a foreign key to other tables.
     */
    function getUserId(){
        return isset($_SESSION['userId']) ? $_SESSION['userId'] : -1;
    }

    function logoutUser(){
        unset($_SESSION[authSessionKey]);
    }
}