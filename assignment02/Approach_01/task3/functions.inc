<?php 

## Defined Globals; might be defined in DB or file (e.g JSON);
## in this case defined as globals because I am very very lazy
$captcha = array(1=>"P51G4", 2=>"h1vno", 3=>"y51Px", 4=>"u01E1", 5=>"bm1a");

// 1. returns sanitized GET String
function getGET($name)
{
	if( isset($_GET[$name]) )
		return filter_var($_GET[$name], FILTER_SANITIZE_STRING);
	else
		return false;
}

// 2. returns sanitized POST String
function getPOST($name)
{
	if( isset($_POST[$name]) )
		return filter_var($_POST[$name], FILTER_SANITIZE_STRING);
	else
		return false;
}


// 3. Valdiate Email
function validateEmail($email){
            // Was an email adress provided?
            if (filter_var($email, FILTER_VALIDATE_EMAIL))
                return true;
            else
                return false;
}
 
// 4. Validate Password
function validatePassword($password, $confPassword){
    if($password === $confPassword)
        return true;
    else
        return false;
}
     

// 4. Set a captcha
function setCaptcha(){
    global $captcha; //Still a lazy guy
    return rand(1,(count($captcha)));
}
        

// 4. Validate Captcha
function validateCaptcha($captchaValue, $captchaId){
    global $captcha; //Still a lazy guy
    if($captcha[$captchaId] === $captchaValue)
        return true;
    else
        return false;
}


//  5. File to array
function readFileInArray($filename){
	
	$i = 0;
	if ( $file = fopen($filename, 'r') ) // try to read
	{	
		
		$zeile = fgets($file); //  Header entfernen
		
		//$zeile = fgets($file);
		while( $zeile = fgets($file) ) 
		{	
			$spalten = explode("|",$zeile);
			$puffer[$i] = $spalten;
			$i++;
		}
	}
	else 
		print "<div style='color:#ff0000'>Error while reading file</div>";
	
	// close file
	fclose($file);
	
	// return array
	return $puffer;
}


/* ###### FileWrite and FileAppend ##### */

// 9. Write array to file
function writeToFile($filename, $array){
	
	if ( $file = fopen($filename, 'w') ) // write mode - falls Datei nicht exisitiert erstellen
	{
		// Daten in Datei schreiben
		foreach($array as $zeile )
		{
			fputs( $file, implode("|", $zeile));
		}
	}
	
	else 
		print "<div style='color:#ff0000'>Error while writing to file</div>";
	
	// close file
	fclose($file);
}



// 10. Append to file
function appendToFile($filename, $array){
	
	if ( $file = fopen($filename, 'a') ) // apppend mode
	{
		// Array an Datei anhängen
		fputs( $file, implode("|", $array) . "\n" );
	}
	else 
		print "<div style='color:#ff0000'>Error while writing to file</div>";

	// close file
	fclose($file);
}