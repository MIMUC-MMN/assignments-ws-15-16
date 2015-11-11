<?php include_once('functions.inc');



## Form
if(isset($_POST['submit'])){

    # Get request properties
    $form['firstname'] = getPost('firstname');
    $form['lastname'] = getPOST('lastname');
    $form['email'] = getPOST('email');
    $form['password'] = getPOST('password');
    $form['confirmPassword'] = getPOST('confPassword');
    $form['subject'] = getPOST('subject');
    $form['message'] = getPOST('message');
    $form['captchaValue'] = getPOST('captchaValue'); 
    $form['captchaId'] = getPOST('captchaId'); 

    // Add datetime
    date_default_timezone_set('Europe/Berlin');
    $form['date'] = date("F j, Y, g:i a"); 

    // Check for empty fields
    foreach ($form as $key=>$value){
        if(!$value)
            $errorMsg .= 'The field "'. $key .'" may not be empty.<br>';
    }
    
    if(!validateEmail($form['email']))
        $errorMsg .= "Please check your email address entered.<br>";

    if(!validatePassword($form['password'], $form['confirmPassword']))
        $errorMsg .= "Passwords does not match.<br>";
    
    if(!validateCaptcha($form['captchaValue'], $form['captchaId']))
        $errorMsg .= "Please check captcha.<br>";
    
    // Remember selectbox
    for($i==1; $i<4; $i++){
        if($form['subject']==$i){
            $formHelper['select'.$i] = "selected=selected";
        }
    }

    ## Store if validation was successful
    if(!$errorMsg){
        // Save in textfile for demo reasons only.
        // Passwords are not filtered and stored in plaintext, hash function with salt and pepper must be used!
        appendToFile("storage", $form); 
        $errorMsg = "<div style='color:#24a544'>Form was sent.</div><br>";
        $form = array();
        $formHelper = array();
    }
}


# Load template files
$entryTemplate = file_GET_contents("entryTemplate.html");
$template = file_GET_contents("template.html");

# Set capatcha
$form['captchaId'] = setCaptcha();


## Output existing data from filestorage
$database = readFileInArray("storage");
if(is_array($database)){

    foreach($database as $row)
    {
        $entryCache = str_replace("{firstname}",  $row[0], $entryTemplate);
        $entryCache = str_replace("{lastname}",  $row[1], $entryCache);
        $entryCache = str_replace("{date}",  $row[9], $entryCache);
        $entryCache = str_replace("{email}",  $row[2], $entryCache);
        $entryCache = str_replace("{message}",  $row[6], $entryCache);

        $entry .= $entryCache;
    }
}

# Manipulate Template - replace placeholders insert empty values if no POST request
$template = str_replace("{errorMsg}",  $errorMsg, $template);
$template = str_replace("{firstname}",  $form['firstname'], $template);
$template = str_replace("{lastname}",  $form['lastname'], $template);
$template = str_replace("{email}",  $form['email'], $template);
$template = str_replace("{password}",  $form['password'], $template);
$template = str_replace("{confPassword}",  $form['confirmPassword'], $template);
$template = str_replace("{select1}",  $formHelper['select1'] , $template);
$template = str_replace("{select2}",  $formHelper['select2'] , $template);
$template = str_replace("{select3}",  $formHelper['select3'] , $template);
$template = str_replace("{message}",  $form['message'], $template);
$template = str_replace("{captchaId}",  $form['captchaId'], $template);
$template = str_replace("{entry}",  $entry, $template);

# Echo template
print($template);
?>
