<?php

## Start session
session_start();

## Include functions
require_once('functions.inc');

## Define Variables
$possibleCharsArr = array("A", "B", "C", "D","E","F","G");
$guessesArray =array(); // Init array fixing notice if index $i is not set
$trialsOutput = NULL;
$statusOutput = NULL;
$codeOutput = NULL;
$errorMsg = NULL;
$errorMsgOutput = NULL;
$rows = NULL;

## If no session exists init game
if(!isset($_SESSION['counter']) || isset($_GET['restart'])) {

    ## Destroy old session
    session_destroy();
    session_start();
    $_SESSION = array();
    
    ## Initialise new session
    $_SESSION['counter'] = 0; // Init session counter
    $_SESSION['gameOver'] = false; // Init game finished property
    $_SESSION['guessedArray'] = array(); // Init guesses 
   
    ## Create pseudo random code and store in session
    $_SESSION['code'] = $searchedCodeArr = createCode($possibleCharsArr);

    ## Output start message

    $errorMsgOutput = "<div id='errorMsg' class='gameStart'>Welcome to 'codeBreaker', to start with the game,
                        please enter four single characters (A-G) into the input fields.</div>"; 
}

## Utilize game logic
else{
    
    ## Prepare variables
    $searchedCodeArr = $_SESSION['code'];
    $code = implode(" ", $searchedCodeArr); // As string
    $counter = $_SESSION['counter'];
    $guessesArray = $_SESSION['guessedArray'];    
    
    ## Proces input (on post request)...
    if(isset($_POST['letter'])){
        
        // Read $_POST SUPERGLOBAL
        $lettersArray = $_POST['letter'];

        
        ## ... and if game not finished (seperated to output meaningful error messages)
        if(!$_SESSION['gameOver']){
            
            ##Loop through post variables (posted as an array)
            foreach ($lettersArray as $key=>$letter){   
                
                $letter = strtoupper($letter); // Make sure that lowercase letters can be used as well
                
                ## Check if letter is between A-G
                if(in_array($letter, $possibleCharsArr)){   
                    
                    $guessesArray[$counter]['letter'][$key] = $letter;  // If true add letter to array

                    ## Check if letter is part of searched code
                    if(in_array($letter, $searchedCodeArr)){
                                            
                    ## Prevent duplicate chars and prepare output colors of circles
                    if(!containsDuplicates($lettersArray)){   
                        
                        ##  If letter is on correct possition 
                        if($letter === $searchedCodeArr[$key])
                            $guessesArray[$counter]['color'][$key] = "red";   // Display red color...
                        else
                            $guessesArray[$counter]['color'][$key] = "black"; // Else display black color
                    }
                    
                    ## If a char is a duplicate
                    else{
                        $errorMsg = "multipleLetters";
                        }
                    }
                    ## If letter is not part of searched code
                    else
                        $guessesArray[$counter]['color'][$key] = ""; // Else display black color

                }
                ## If any letter is not A-G
                else{
                    $errorMsg = "wrongLetters";
                }
            }
        }
            
                
        ## Check current round and set gameOver property if 10 rounds were played
        if($counter > 8 || $_SESSION['gameOver'] == true){
            $errorMsg = "gameOver";
        }
        
        ## Check game results if no error occured
        if($errorMsg == ""){
            
            ## Check if all answers are correct
            if(countCorrectAnswers($guessesArray, $counter) === 4){
                $statusOutput = "Congratulations. You won!";
                $codeOutput =  "The code was: <b> $code </b>.";
                $errorMsg = "gameOver";
            }
            
            ## Store any valid guess and increment counter (only valid guesses are counted)
            $_SESSION['guessedArray'] = $guessesArray; // Store guesses
            $counter++;
            $_SESSION['counter'] = $counter;
            
            ## Output counts
            $trialsOutput = "This is your $counter of 10 guesses.";
            
        }
        ## Exept on gameOver, remove last input to prevent cheating (e.g. entering infinity amount of single chars on every position)
        elseif($errorMsg != "gameOver")
            if(is_array($guessesArray)) // Do not try to pop if array is empty
                array_pop($guessesArray);
        
        ## Set session cookie and output message on GameOver
        if($errorMsg == "gameOver"){
            $_SESSION['gameOver'] = true;
            $statusOutput = "Please click to restart to play again.";
            $codeOutput =  "The code was: <b> $code </b>.";
        }
    }

    ## If session is started but POST method was not used
    else
        $errorMsg = "post";
}

# Load template files
$template = file_GET_contents("template/template.html");
$rowTemplate = file_GET_contents("template/row.html");


## Display messages and ensure that users cannot cheat using wrong inputs (hide last input)
if(isset($errorMsg))
{
    if($errorMsg == "gameOver")
        $errorMsgOutput = "<div id='errorMsg' class='gameOver'>Game over. Please restart the game.</div>";
    elseif($errorMsg == "post")
        $errorMsgOutput = "<div id='errorMsg'>Please use the checkbutton to validate your input. The last trial was not counted,</div>";
    elseif($errorMsg == "multipleLetters")
        $errorMsgOutput = "<div id='errorMsg'>Every character may only be used once. The last trial was not counted.</div>";
    elseif($errorMsg == "wrongLetters")
        $errorMsgOutput = "<div id='errorMsg'>Only characters between A-G may be used. The last trial was not counted.</div>";
    else        
        $errorMsgOutput = "Unknown error. Please restart game.";
}


## Draw output algorythm
for($i=0; $i<10; $i++){  // Draw ten rows - (could simply made "dynamic using $counter property)
    $rowTemp = $rowTemplate; // Prevent file reload (improve performance)
    for($n=0; $n<4; $n++){ // Each rows has four digits
        
        // Prevent undefined offset notice
        if(array_key_exists($i, $guessesArray)){
            $enteredChar = $guessesArray[$i]['letter'][$n];
            $outputColor = $guessesArray[$i]['color'][$n];
        }
        else{
            $enteredChar = "";
            $outputColor = "";
        }
        
        $rowTemp = str_replace("{letter$n}", $enteredChar, $rowTemp);    // Insert digits
        $rowTemp = str_replace("{color$n}", $outputColor, $rowTemp);  // Manipulate color
    }
    $rows .= $rowTemp; // Collect all rows to output them together
}


# Manipulate Template - replace placeholders insert empty values if no POST request
$template = str_replace("{errorMsg}",  $errorMsgOutput, $template);
$template = str_replace("{status}",  $statusOutput, $template);
$template = str_replace("{trials}",  $trialsOutput, $template);
$template = str_replace("{code}",  $codeOutput, $template);
$template = str_replace("{rows}",  $rows, $template);

# Print processed page
print $template;
?>
