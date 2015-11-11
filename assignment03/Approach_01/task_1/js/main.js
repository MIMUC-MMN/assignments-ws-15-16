/* 
Assignment 1 MMN "CookieLaw"
Vanilla JS (no libraies, no frameworks) 
Tested on Safari 9.0(OSX 10.11), Firefox 41.0.2 (OSX 10.11), Chrome 46.0.2490.71 (OSX 10.11)
Print media queries working best in Chrome.
Wednesday, 4th, November 2015
*/



/*################ Helper Functions ##############################*/   
function getById(thisId){
    return document.getElementById(thisId);
}
    
function getByClass(thisClass){
    return document.querySelector("." + thisClass);
}    
    
function getByElement(thisElement){
    return document.querySelector(thisElement);
}    

// Source getCookie function: w3schools
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
        



/*################ Event Functions ##############################*/   

// Check if cookieBox must be displayed. Called when DOM is ready
function loadCookieBox(){
    
    var hideCookieBox = getCookie('hideCookieBox');
    if(hideCookieBox !== "true")
        showCookieBox();
}

// Show box
function showCookieBox(){
    getById('cookieLaw').className = "visible";
}

// Hide box once it was visible
function hideCookieBox(){
    
    // Hide CookieBox
    getById('cookieLaw').className = "";
    
    // Check timeout and if true set cookie
    trySetCookie();
}

// Check if scrolled to bottom
function scrollListener(){
        if((document.body.scrollTop + window.innerHeight) === document.body.scrollHeight){
            hideCookieBox();
        }
}

// Check if anything was clicked three times
function clickListener(){
    
    /* Using "HTML5 data attribute to prevent using a global variable 
    (even if this might not be the most performant way)*/
    var counter = getByElement('body').getAttribute('data-count');
    counter++;
    
    // Update data-attribute in HTML body tag
    getByElement('body').setAttribute('data-count', counter);
    
    // Check if already clicked three times
    if(counter > 2){
        hideCookieBox();
    }
    
}

// Called after 10sek timeout
function timeoutListener(){
    
    /* Using "HTML5 data attribute to prevent using a global variable 
    (even if this might not be the most performant way)*/
    var timeout = getByElement('body').setAttribute('data-timeout', 'true');

    trySetCookie();
}

// Set cookies if timeout is over and conditions (see task1) are fullfilled
function trySetCookie(){
    
    // Get parameters form DOM
    var cookieBoxClass = getById('cookieLaw').className,
        timeout         = getByElement('body').getAttribute('data-timeout'),
        doNotTrack      = getById('doNotTrack').checked;
    
    // Check timeout and set cookie if possible
    if((cookieBoxClass !== "visible") && timeout === "true"){

        // prevent box to be shown on page reload
        document.cookie="hideCookieBox=true";
        
        // Set doNotTrack cookie if checkbox was checked
        if(doNotTrack)
            document.cookie="doNotTrack=true";
        else
            document.cookie="doNotTrack=false";
    }
}


/*################ Event Handler ##############################*/   
loadCookieBox();
window.setTimeout(timeoutListener, 10000); // Within a 10 second time frame, no cookie is stored in the browser
getByClass('close').onclick     = hideCookieBox;    
getByElement('body').onclick    = clickListener;
document.onscroll               = scrollListener;    
