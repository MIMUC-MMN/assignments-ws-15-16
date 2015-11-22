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
    <link rel="stylesheet" href="notes.css"/>
</head>
<body>

<header class="header">
    <?php
    // ================================================================================================================
    // LOGIN
    if (isset($_POST['username']) && isset($_POST['password'])) {
        // try to log in.
        if ($authHandler->loginUser($_POST['username'], $_POST['password'])) {
            echo "<div class='notification success'>Hi ".$authHandler->getUserName().", you are now logged in!</div>";
        } else {
            echo "<div class='notification error'>We're sorry, but the log in failed. Is the password correct?</div>";
        }
    }

    // LOGOUT
    if (isset($_POST['logout'])) {
        $authHandler->logoutUser();
    }

    // ADD NOTE
    // check if the user has submitted a new note:
    if (isset($_POST['submitNote'])) {
        if (isset($_POST['title']) && isset($_POST['content'])) {

            if ($dbHandler->insertNote($_POST['title'], $_POST['content'], $authHandler->getUserId())) {
                echo "<div class='notification success'>Successfully added note!</div>";
            } else {
                echo "<div class='notification error'>Oops! There was an error while saving your note.</div>";
            }
        }
    }


    // DELETE NOTES
    if (isset($_POST['submitDelete']) && isset($_POST['delete'])) {
        $notesToDelete = array();
        foreach($_POST['delete'] as $noteId){
            $notesToDelete[] = $noteId;
        }
        if($dbHandler->deleteNotes($notesToDelete)){
            echo "<div class='notification success'>Successfully deleted notes.</div>";
        }else{
            echo "<div class='notification error'>Sorry, we couldn't delete those notes. </div>";
        }
    }
    // ================================================================================================================

    echo "<div class='brand'>Notes</div>";
    if ($authHandler->isUserLoggedIn()){
    ?>


    <div class="profile">
        <form method="post" class="logout">
            <input type="submit" value="Log out" name="logout"/>
        </form>
        <div class="username"><?php echo $authHandler->getUserName(); ?></div>
    </div>
    <div class="clear"></div>
</header>
<div id="container">
    <?php
    // allow note taking

    echo "<section class='input'>";
    include_once('note.form.inc.php');
    echo "</section>"; ?>
    <form method='post' >
        <input type="submit" name="submitDelete" value="Delete selected notes" class="deleteNotesButton" />
        <div class="clear"></div>
    <section class='notes'>
        <div class="flexParent">
            <?php
            $notes = $dbHandler->getNotesForUser($authHandler->getUserId());
            foreach ($notes as $note) {
                echo "<div class='note flexChild'><input type='checkbox' value='$note->id' name='delete[]'><div class='title'>$note->title</div><div class='content'>$note->content</div></div>";
            }
            echo "<div class='clear'></div>";
            echo "</div>"; // flexparent
            echo "</section>"; // notes
            echo "</form>"; // delete form
            } else {
                echo "</header>";
                echo "<div id='container'>";
                include_once('login.form.inc.php');
                echo "<div><a href='registration.php'>Register</a></div>";
                echo "</div>"; // container;
            }
            ?>
</div>
<script>
    (function(){
        var checkedItemCount = 0;
        var deleteButton = document.querySelector('.deleteNotesButton');
        if(document.querySelectorAll){
            var checkboxes = document.querySelectorAll('input[type=checkbox]');
            for(var i=0; i<checkboxes.length;i++){
                checkboxes[i].addEventListener('change',function(){
                    if(this.checked){
                        checkedItemCount++;
                    } else{
                        checkedItemCount--;
                    }
                    if(checkedItemCount > 0){
                        deleteButton.classList.add('show');
                    } else{
                        deleteButton.classList.remove('show');
                    }
                    deleteButton.value = "Delete "+checkedItemCount+(checkedItemCount > 1 ? " notes." : " note.");
                })
            }
        }
    })();

</script>
</body>
</html>