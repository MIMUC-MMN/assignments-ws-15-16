<?php

## Start session
session_start();

## Define Globals
    $possibleLettersArray = array("A", "B", "C", "D","E","F","G");

## If no session exists init game
if(!isset($_SESSION['counter']) || isset($_GET['restart'])) {

    ## Destroy old session
    session_destroy();
    session_start();
    $_SESSION = array();
    
    ## Initialise new session
    $_SESSION['counter'] = 1; // Init session counter
    $_SESSION['gameOver'] = true; // Init game finished property
   
    ## Create pseudo random code
    $searchedCodeArray = array();

    while(count($searchedCodeArray)<4){
        $random = rand(0,count($possibleLettersArray)-1);  // Create random number
        $randomLetter = $possibleLettersArray[$random]; // Get...
        unset($possibleLettersArray[$random]);          // and remove letter from array
        $possibleLettersArray = array_values($possibleLettersArray); // Reorder array
        array_push($searchedCodeArray,$randomLetter);   // Add to code
        //... and search another letter
    }
    
    ## Store code in session
    $_SESSION['code'] = $searchedCodeArray;
    
    ## Output start message
    $trialsOutput = "Welcome to 'codeBreaker', to start with the game, <br>
                    please enter four characters (A-G) into the input field."; // Output number of attempts

}

## Utilize game logic
else{
    if(isset($_POST['letter'])){
        
        ## Prepare variables
        $lettersArray = $_POST['letter'];
        $searchedCodeArray = $_SESSION['code'];
        //print_r($searchedCodeArray);
        $counter = $_SESSION['counter']; // Increment and save to var
        $guessesArray = $_SESSION['guessedArray'];

        ## Proces input if game not finished
        if(!$_SESSION['gameOver']){
            foreach ($lettersArray as $key=>$letter){   // Loop through post variables (posted as an array)
                
                $letter = strtoupper($letter); // Make sure that lowercase letters can be used as well
                
                ## Check if letter is between A-G
                if(in_array($letter, $possibleLettersArray)){   
                    
                    $guessesArray[$counter]['letter'][$key] = $letter;  // If true add letter to array
                    
                    ## Check if letter is part of searched code
                    if(in_array($letter, $searchedCodeArray)){
                    
                    ## Prevent duplicate letters and prepare output colors of circles
                    if(!in_array($letter, $guessesArray[$counter]['letter'])){
                        
                        ##  If letter is on correct possition 
                        if($letter === $searchedCodeArray[$key])
                            $guessesArray[$counter]['color'][$key] = "red";   // Display red color...
                        else
                            $guessesArray[$counter]['color'][$key] = "black"; // Else display black color
                    }
                    ## If a single letter occures multiple times
                    else{
                        $errorMsg = "<div id='errorMsg'>Every character may only be used once.</div>";
                        $guessesArray = "";
                        break;
                        }

                    }
                    else
                        $guessesArray[$counter]['color'][$key] = "white"; // White for letters which dont appear in the code
                }
            }
        }
        ## If game is over
        else
            $errorMsg = "<div id='errorMsg'>Game over. Please restart the game.</div>";
            
        
        
        ## Display game results
        if(is_array($guessesArray[$counter])){
                
            $_SESSION['guessedArray'] = $guessesArray; // Store guesses
    
            $correctAnswers = array_count_values($guessesArray[$counter]['color']); // Count the occurens...
            $countCorrectAnswers = $correctAnswers['red']; // ...of "red"...
            if($countCorrectAnswers === 4) // in order to see if all answeres are correct
            {
                $code = implode(" ", $guessesArray[$counter]['letter']);
                $statusOutput = "Congratulations. You won!";
                $codeOutput =  "The code was: <b> $code </b>.";
                $_SESSION['gameOver'] = true;
                $errorMsg = "<div id='errorMsg'>Game over. Please restart the game.</div>";
            }
        }

        
        ## Check current round and set game over property
        if($counter > 9){
            $_SESSION['gameOver'] = true;
            $errorMsg = "<div id='errorMsg'>Game over. Please restart the game.</div>";
        }
    }
}

# Load template files
$template = file_GET_contents("template/template.html");
$rowTemplate = file_GET_contents("template/row.html");

## Draw output algorythm
for($i=1; $i<11; $i++){  // Draw ten rows
    $rowTemp = $rowTemplate; // Prevent file reload (improve performance)
    for($n=0; $n<4; $n++){ // Each rows has four digits
        $rowTemp = str_replace("{letter$n}", $guessesArray[$i]['letter'][$n], $rowTemp);    // Insert digits
        $rowTemp = str_replace("{color$n}", $guessesArray[$i]['color'][$n], $rowTemp);  // Manipulate color
    }
    $rows .= $rowTemp; // Collect all rows to output them together
}

# Manipulate Template - replace placeholders insert empty values if no POST request
$template = str_replace("{errorMsg}",  $errorMsg, $template);
$template = str_replace("{nummer}",  $counter, $template);
$template = str_replace("{status}",  $statusOutput, $template);
$template = str_replace("{trials}",  $trialsOutput, $template);
$template = str_replace("{code}",  $codeOutput, $template);
$template = str_replace("{rows}",  $rows, $template);

# Print processed page
print $template;
?>
