<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Unbenanntes Dokument</title>
<link rel="stylesheet" href="style.css">

</head>


<?php
$methode = $_POST['methode'];
$zahl1 = $_POST['zahl1'];
$zahl2 = $_POST['zahl2'];
if($_POST['sent']){
    if (empty($zahl1) && empty($zahl2) && $zahl1 !="0" && $zahl2 !="0") 
    {
        print "<h1 style='color:red;'>Bitte beide Felder ausfüllen</h1>";
    }
    else if (empty($zahl1) && $zahl1 !="0") 
    {
        print "<h1 style='color:red;'>Bitte Feld1 ausfüllen</h1>";
        $fehlerZahl2 = $zahl2;
    }

    else if (empty($zahl2)&& $zahl2 !="0" ) 
    {
        print "<h1 style='color:red;'>Bitte Feld2 ausfüllen</h1>";
        $fehlerZahl1 = $zahl1;
    }


    else{
        if ($methode == '+')
                {
                    $ergebnis = $zahl1 + $zahl2;
                }
            else if ($methode == '-')
                {
                    $ergebnis = $zahl1 - $zahl2;
                }
            else if ($methode == '*')
                {
                    $ergebnis = $zahl1 * $zahl2;
                }
            else if ($methode == '/')
                {
                    if( $zahl2 == 0)
                        {
                            print "<h1 style='color:red;'>Man kann nicht durch 0 teilen</h1>";
                            $fehler = $zahl1;
                            $fehler = $zahl2;
                        }
                    else
                        {
                            $ergebnis = $zahl1 / $zahl2;
                        }
                }
    }
}
?>
<div class="container">
	
    <form action="index.php" method="post">
        <div class="row">
            <div id="zahl1" class="columns four">
                <input type="text" name="zahl1" <?php print 'value ="' .$ergebnis . $fehlerZahl1. '"' ?>>
            </div>
            <div class="columns one">
                <div class="middle"><input type="radio" name="methode"  checked="checked" value="+">+</div>
                <div class="middle"><input type="radio" name="methode" value="-"> - </div>
                <div class="middle"><input type="radio" name="methode" value="*"> * </div>
                <div class="middle"><input type="radio" name="methode" value="/"> / </div>
            </div>
            <div class="columns four">
                <input type="text" name="zahl2" <?php print 'value ="' . $fehlerZahl2 . '"' ?> ><br>
            </div>
            <div class="columns one">
                <input style="display:none" type="text" name="sent" <?php print 'value="sent"'?> ><br>
            <input type="submit" value="=">	
            </div>
    	</div>
	</form>
</div>