<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8"/>
    <title>HTML 5</title>
</head>

<body>
    <form id="form" action="index.php" method="post">
        <textarea id="input" name="input" style="width:500px; height:100px;"></textarea><br>
        <button type="submit">Shuffle word</button><hr/>
    </form>

<?php

if(isset($_POST['input'])){
    $input = $_POST['input'];
    $inputArray = explode(" ", $input);
    foreach($inputArray as $word){
        $word = trim($word);
        # Make string to array
        $letterArray = str_split($word);
        
        #Get first and last letter
        $firtChar = array_shift($letterArray);
        $lastChar = array_pop($letterArray);

        if(ctype_punct){
            $lastChar = array_pop($letterArray) . $lastChar;
        }
        
        # Shuffel letters
        $letterArry = shuffle($letterArray);
        ## Echo
        echo $firtChar;
        echo implode($letterArray);
        echo $lastChar. " ";
    }
}

?>
    
    </body>
</html>
