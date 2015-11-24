<?php
session_start();

use views\helpers\PathHelper;
require_once(dirname(dirname(dirname(__FILE__))) . '/views/helpers/PathHelper.php');
$path = new PathHelper();

require_once($path->getModelPath() . 'DBHandler.php');
require_once($path->getModelPath() . 'AuthHandler.php');
require_once($path->getConfigPath() . 'connectionInfo.private.php');

$dbHandler = new DBHandler($host, $user, $password, $db);
$authHandler = new AuthHandler($dbHandler);

if (isset($_POST['title']) && isset($_POST['content'])) {

    if ($id = $dbHandler->insertNote($_POST['title'], $_POST['content'], $authHandler->getUserId())) {
        $result = array(
            "id" => $id,
            "title" => $_POST['title'],
            "content" => $_POST['content'],
        );
    } else {
        header("HTTP/1.1 501 Could not modify object");
        $result = array(
            "error" => "An error occurred saving your note."
        );
    }

} else {
    // title and content were not set
    header("HTTP/1.1 502 Empty parameter set");
    $result = array(
        "error" => "Please provide a title and content for your note."
    );
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode($result);