<?php
session_start();

use views\helpers\PathHelper;
require_once(dirname(dirname(dirname(__FILE__))) . '/views/helpers/PathHelper.php');
$path = new PathHelper();

require_once($path->getModelPath() . 'DBHandler.php');
require_once($path->getConfigPath() . 'connectionInfo.private.php');

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