<?php
session_start();

require_once('DBHandler.php');
require_once('connectionInfo.private.php');
$dbHandler = new DBHandler($host, $user, $password, $db);

if($dbHandler->deleteNote($_POST['note-id'])) {
    $result = array(
        "deleted" => $_POST['note-id']
    );
} else {
    header("HTTP/1.1 501 Could not modify object");
    $result = array(
        "error" => "An error occurred saving your note."
    );
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode($result);