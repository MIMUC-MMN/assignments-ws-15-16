<?php

## Loop though array and retrun true if value exists multiple times
function containsDuplicates($array){
    $counted = array_count_values($array); // Count the occurens of a value
    foreach($counted as $occurence){
        if($occurence>1)
            return true;
    }
    return false;
}

## Takes (array) possible chars and creates a random 4 char long code
function createCode($possibleCharsArr){
    $searchedCodeArr = array();
    while(count($searchedCodeArr)<4){
        $random = rand(0,count($possibleCharsArr)-1);  // Create random number
        $randomLetter = $possibleCharsArr[$random]; // Get...
        unset($possibleCharsArr[$random]);          // and remove letter from array
        $possibleCharsArr = array_values($possibleCharsArr); // Reorder array
        array_push($searchedCodeArr,$randomLetter);   // Add to code
        //... and search another letter
    }
    return $searchedCodeArr;
}


// Takes (array) guessed chars and (int) round and counts correct answeres
function countCorrectAnswers($guessesArray, $counter){
    $guessesColorArray = $guessesArray[$counter]['color'];
    if(is_array($guessesColorArray)){
        $correctAnswers = array_count_values($guessesColorArray); // Count the occurens...
        if(isset($correctAnswers['red']))
            return $correctAnswers['red']; // ...of "red" (correct answers)...
     }
     else
        return 0;
}
?>
