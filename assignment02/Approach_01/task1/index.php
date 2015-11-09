<!DOCTYPE html>
<html>
    <head lang="en">
    <meta charset="UTF-8" />
    <title>What's wrong here</title>￼￼  
</head>
<body>
    <?php 
        function loginUser($email, $password){
            // Was an email adress provided?
            if (filter_var($email, FILTER_VALIDATE_EMAIL))
                return true;
            else
                return false;
        }
        
        $error = false;
        if( !empty($_POST['email']) &&  !empty($_POST['password']) ){
            
            //Try to remove harmful syntax
            $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
            $password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
            
            if(loginUser($email, $password))
                echo "Welcome, $email. You are logged in.";
            else
                $error = true;

        }
        if(!isset($_POST['submit']) || $error){
            if($error)
                echo "Please check username and password.";
    ?>
    <form action="index.php" method="post">
        <label>Email:<input type="text" name="email"></label>
        <label>Password:<input type="password" name="password"></label>
        <input type="submit" name="submit"/>
    </form>
    <?php } ?>
</body>
</html>