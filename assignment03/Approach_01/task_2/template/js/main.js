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

function setHeight(element){
    getByElement(element).style.height = document.body.scrollHeight  + "px";
}   
/*################ Event Functions ##############################*/   

// Show modal
function showModal(){
    getById('modalWindow').className = "visible";
}

// Hide modal
function hideModal(){
    // Hide CoockieBox
    getById('modalWindow').className = "";
}

function keypressListener(event){
    console.log(event.which);
    // Ignore shift keypress
    if(!event.shiftKey){
        var allowedCharsArr = ["A", "B", "C", "D","E","F","G"]; // Allowed characters
            thisType            = event.target.getAttribute('type'); // Get type of next element
            nextType            = event.target.nextElementSibling.getAttribute('type'); // Get type of next element

        if(thisType == "text"){ // for input boxes

            var value = event.target.value.toUpperCase();  // Get value of textbox

            // If char is allowed jump to next field
            if(allowedCharsArr.indexOf(value) != -1){
                event.target.style.color = "#000";
                if(nextType == "text")
                    event.target.nextElementSibling.focus();
                // Disabled as it annoyed me - Autosubmit if last char was valid
                //else if(nextType == "submit") // for input boxes
                //    getById("form").submit();
            }
            // Otherwise mark it red
            else if (event.which !== 16 && value.length >0) {
                event.target.style.color = "#ff0000";
                console.log("error")
            }
        }
    }
}

/*################ Onload Handler ##############################*/ 
setHeight('#modalBackground'); //Set height of modalBackground

/*################ Event Handler ##############################*/ 
getById('openModal').onclick        = showModal;    
getById('close').onclick            = hideModal;
getById('modalBackground').onclick  = hideModal;    
getByElement('body').onkeyup  = keypressListener; // Listen to any keypress to prevent redundat assignment of the event listener
