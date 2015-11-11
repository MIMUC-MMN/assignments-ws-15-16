<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cookie-Box</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/cookiebox.css">
</head>
<body>

<?php
// flag indicating whether the user ahs accepted our cookie-policy
$accepted = $_COOKIE['accepted'];
?>

<div id="wrapper">
    <div id="main">
        <?php // a little status box, indicating acceptance-status; updated via jQuery ?>
        <div class="cookie-status <?= $accepted ? 'accepted' : '' ?>">
            Cookie has <?= !$accepted ? 'not' : '' ?> been accepted!
        </div>

        <h1>Welcome to the world of cookies!</h1>

        <section>
            <h2>Instructions</h2>
            To agree with the cookie-policy, perform one of the following actions:
            <ul>
                <li>close the cookie-box by clicking the <strong>X</strong> in the top right corner,</li>
                <li>scroll to the bottom of the page,</li>
                <li>perform three clicks anywhere on the site.</li>
            </ul>

            This will hide the cookie-box permanently. However, should you leave the page within 10 seconds after any
            of the above, no cookie will be set at all.
        </section>

        <section>
            <h2>What a load of dummy-text...</h2>
            <article class="dummy">
                Grill diced chickpeas in a casserole with leek lassi for about an hour to soothe their tartness.
                Butter combines greatly with hot meatloaf. Squid tastes best with adobo sauce and lots of cumin.
            </article>
        </section>
    </div>
</div>

<?php // hide the cookie-box if an 'accepted'-cookie has been transmitted?>
<div id="cookie-box" style="<?= $accepted ? 'display: none;' : '' ?>">
    <div id="cookie-box-content">
        <i class="close">X</i>
        <strong>This site uses cookies!</strong>
        Unless you manually disable cookies for this website via your browser, we assume you agree with this policy.
    </div>
</div>

<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/cookiebox.js"></script>

</body>
</html>