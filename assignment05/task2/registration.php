<?php
session_start();

use views\helpers\PathHelper;

require_once(dirname(__FILE__) . '/app/views/helpers/PathHelper.php');
$path = new PathHelper();

require_once($path->getModelPath() . 'DBHandler.php');
require_once($path->getModelPath() . 'AuthHandler.php');
require_once($path->getConfigPath() . 'connectionInfo.private.php');

$dbHandler = new DBHandler($host,$user,$password,$db);
$authHandler = new AuthHandler($dbHandler);
?>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Registration for Note Taking App</title>
    <link rel="shortcut icon" type="image/x-icon" href="<?= $path->getAssetPath() ?>/favicon.ico">
    <link rel="stylesheet" href="<?= $path->getAssetPath() ?>/css/notes.css" />
</head>
<body>

<?php
if(isset($_POST['submit'])){
    if( isset($_POST['password'])
        && isset($_POST['password_confirmation'])
        && isset($_POST['username'])){

        if($_POST['password'] == $_POST['password_confirmation']){
            if($authHandler->registerUser($_POST['username'],$_POST['password'])){
                if($authHandler->loginUser($_POST['username'],$_POST['password'])){
                    $success = true;
                    echo '<div class="notification success">Successfully registered, you are now logged in.
                            Forwarding... </div>';
                    // forwards the user to the notes page.
                    echo "<script>
                            setTimeout(function(){
                                window.location.href='/';
                            },2000);
                        </script>";
                };
            }
            else{
                echo '<div class="notification error">Someone else is already using this username. Please try a different name.</div>';
            }
        }
        else{
            echo "<div class='notification error'>The passwords did not match, please try again.</div>";
        }

    }
}
if(!isset($success)){
?>

<div id="container">
<form method="post" class="register">
    <input type="text" name="username" placeholder="User Name"
    value="<?php if(isset($_POST['username']))echo $_POST['username']?>"
    />
    <input type="password" name="password" placeholder="Password"
    />
    <input type="password" name="password_confirmation" placeholder="Confirm Password" />
    <input type="submit" name="submit" value="Register User" />
</form>
</div>
<?php } ?>
</body>
</html>