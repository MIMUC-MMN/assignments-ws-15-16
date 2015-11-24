<?php

define('authSessionKey','isAuthenticated');

use views\helpers\PathHelper;

require_once(dirname(dirname(__FILE__)) . '/views/helpers/PathHelper.php');
$path = new PathHelper();

require_once($path->getModelPath() . 'DBHandler.php');

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
        $user = $this->dbHandler->queryUserByUserName($userName);
        $passwordVerificationResult = password_verify($password,$user->getHash());
        if($passwordVerificationResult){
            $_SESSION[authSessionKey] = true;
            $_SESSION['userName'] = $user->getName();
            $_SESSION['userId'] = $user->getId();
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