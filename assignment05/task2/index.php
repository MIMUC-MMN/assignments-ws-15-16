<?php
define('DS', DIRECTORY_SEPARATOR);
define('APP_ROOT', dirname(__FILE__) . DS . 'app');
define('ASSETS', dirname(__FILE__) . DS . 'public');

// lets not get into any fancy stuff like autoloading, just load a view
include_once(APP_ROOT . DS . 'views' . DS . 'notes.php');