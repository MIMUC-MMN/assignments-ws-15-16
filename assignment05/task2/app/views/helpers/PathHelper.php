<?php

namespace views\helpers;

define('DS', DIRECTORY_SEPARATOR);
define('ROOT_PATH', dirname(dirname(dirname(__FILE__))));
define('APP_ROOT', ROOT_PATH . DS . DS);
define('MODEL_PATH', APP_ROOT . DS . 'models' . DS);
define('CONFIG_PATH', APP_ROOT . DS . 'config' . DS);
define('VIEW_PATH', APP_ROOT . DS . 'views' . DS);
define('ASSETS_PATH', 'public');


class PathHelper
{

    public function getAssetPath() {
        return ASSETS_PATH;
    }

    public function getModelPath() {
        return MODEL_PATH;
    }

    public function getConfigPath() {
        return CONFIG_PATH;
    }

    public function getViewPath() {
        return VIEW_PATH;
    }
}