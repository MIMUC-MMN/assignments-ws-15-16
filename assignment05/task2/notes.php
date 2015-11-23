<?php
session_start();
require_once('DBHandler.php');
require_once('AuthHandler.php');
require_once('connectionInfo.private.php');
$dbHandler = new DBHandler($host, $user, $password, $db);
$authHandler = new AuthHandler($dbHandler);
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>User Notes</title>
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/notes.css"/>
</head>
<body>

<header class="header">
    <?php
    // ================================================================================================================
    // LOGIN
    if (isset($_POST['username']) && isset($_POST['password'])) {
        // try to log in.
        if ($authHandler->loginUser($_POST['username'], $_POST['password'])) {
            echo "<div class='notification success'>Hi " . $authHandler->getUserName() . ", you are now logged in!</div>";
        } else {
            echo "<div class='notification error'>We're sorry, but the log in failed. Is the password correct?</div>";
        }
    }

    // LOGOUT
    if (isset($_POST['logout'])) {
        $authHandler->logoutUser();
    }

    // ================================================================================================================

    ?>
    <div class="brand">Notes</div>

    <?php if ($authHandler->isUserLoggedIn()): ?>

    <div class="profile">
        <form method="post" class="logout">
            <input type="submit" value="Log out" name="logout"/>
        </form>
        <div class="username"><?php echo $authHandler->getUserName(); ?></div>
    </div>
    <div class="clear"></div>
</header>
<div id="container">

    <section class="input">
        <?php include_once('./includes/note.form.inc.php'); ?>
    </section>


    <div class="clear"></div>
    <section class="notes">
        <div class="flexParent">
            <?php $notes = $dbHandler->getNotesForUser($authHandler->getUserId()); ?>
            <?php foreach ($notes as $note): ?>
                <div id="note-<?= $note->id ?>" class="note flexChild">
                    <i class="delete fa fa-trash fa-lg"></i>
                    <div class="title"><?= $note->title ?></div>
                    <div class="content"><?= $note->content ?></div>
                </div>
            <?php endforeach; ?>
            <div class='clear'></div>
        </div>
    </section>
    <?php else: ?>
    </header>
    <div id="container">
    <?php include_once('./includes/login.form.inc.php'); ?>
    <div><a href="registration.php">Register</a></div>
    </div>
    <?php endif; ?>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="js/app.js"></script>
</body>
</html>