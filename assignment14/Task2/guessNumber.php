<?php
    session_start();
    $myCode = '1234';
?>

<!DOCTYPE html><html>
<head lang="en">
 <title>Guess a Number</title>
</head>
<body>
<form method="POST" >
 <input type="number" name="guess" />
 <input type="submit" value="Check!" />
</form>

<?php
    
    if(isset($_POST['guess'])){
        if($_POST['guess'] === $myCode){
           echo '<h1>Congrats, you won!</h1>';
            session_destroy();
            $_SESSION = array();
        }
        else{
            if(!isset($_SESSION['count'])){
                $_SESSION['count']=1;
            }
            else{
                $_SESSION['count']++;
            }
            echo '<h1>Try it again. This was your ' . $_SESSION['count'] . ' trial </h1>';
        }
    }
    
?>

</body>
</html>