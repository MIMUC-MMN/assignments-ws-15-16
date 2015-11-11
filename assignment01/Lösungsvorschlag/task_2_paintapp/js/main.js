/* 
Assignment 1 MMN "Canvas Paint App"
Vanilla JS (no libraies, no frameworks) 
Tested on Safari 9.0(OSX 10.11), Firefox 41.0.2 (OSX 10.11), Chrome 46.0.2490.71 (OSX 10.11)
Print media queries working best in Chrome.
Friday, 23th, October 2015
*/

// Helper functions
function getById(thisId){
    return document.getElementById(thisId);
}
    
function getByClass(thisClass){
    return document.querySelector("." + thisClass);
}    
    
function getByElement(thisElement){
    return document.querySelector(thisElement);
}    
            
function formatRGB(rgb){
    return 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')';
}
    
function randomise(min, max) {
    return Math.random() * (max - min) + min;
}

function prepareCanvas(){
    var canvas = getById("canvas"),
        context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    return context;
}

function leftMouseClicked(event){
    // Check mouseButtons. Safari does not Support W3C standard - must use .which
    if (event.buttons === undefined || event.buttons ===1){
        var button = event.buttons || event.which;
        if(button)
            return true;
    }
    return false;
}    
    


// Define Globals. Prevent mutliple execution during mousemove events
var canvas  = getById("canvas"),
    context = canvas.getContext('2d'),
    // #PETER: Warning! You are ending the variable definitions
    // because you entered a semi-colon instead of a comma.
    // 
    // Should be:
    // wrapper = getById('wrapper'),
    // 
    // Otherwise, your variables will land in the global scope (which they are anyways in your case,
    // but it'd still be cleaner code)
    wrapper = getById('wrapper');
    // #PETER: You can also just write
    // lastX, lastY, ...
    // if you want to leave them undefined
    lastX   = undefined,
    lastY   = undefined, 
    tmpCanvasStorage  = [],
    canvasStorage     = [],
    canvasStorageRedo = [],
    foregroundColor = '#000',
    tool = "pen",
    setSize = 1;
    
/* ######### START::Draw on canvas #########*/
function draw(x,y, color, size, tool){
    
    context.beginPath();
    context.lineJoin= 'round'; 
    context.lineCap = 'round';
    context.lineWidth = size;
    context.strokeStyle = color;
    context.moveTo(lastX, lastY);
    context.globalAlpha = 1.0;
    
    if(tool == "spray"){
        
        // #PETER: i is not defined as a variable and will overwrite any i in the global scope!
        // Better:
        // for (var i = 0; ...)
        
        //Spray is random and due to performance advantages we 
        //do not save the individual pixels for undo/redo
        for (i = 0; i<20*size; i++){
            var angle = randomise(1, 360), // random 0-360°angle
                radius = randomise(0, size*5),
                deviationX = radius * Math.cos(angle),
                devaitonY  = radius * Math.sin(angle);
            context.fillStyle = color;
            context.fillRect(x-deviationX, y+devaitonY, 1, 1);
            context.closePath();
        }
    }
    else{
        if(tool == "brush")
            context.lineWidth = size*10; //Brush is simulated by beeing just thicker
        else if(tool == "marker"){
            context.lineJoin= 'bevel'; 
            context.lineCap = 'bevel';
            context.lineWidth = (size+5)*3;
            context.globalAlpha = 0.7;
        }

    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    }
}    

function singleClickOnCanvas(event){
        mouseOnCanvas(event, true);
}

function mouseOnCanvas(event, click){

    var x = event.offsetX,
        y = event.offsetY,
        eventLeftMouse = leftMouseClicked(event);
    
    // do while mousebutton is clicked
    if(eventLeftMouse || click){

        if(click)
            x-=1; // Last mousepositon is == to clickposition; small difference required
        
        draw(x,y,foregroundColor, setSize, tool);

        tmpCanvasStorage.push([x,y, foregroundColor, setSize, tool]);
        lastX = x;
        lastY = y;
}
    else{
        lastX = x;
        lastY = y;
        
        // Save drawing to array, clear temp storage
        if(tmpCanvasStorage.length > 0){
            canvasStorage.push(tmpCanvasStorage);
            tmpCanvasStorage = [];
        }
    }
}

   
/* ######### START::UNDO/REDO #########*/
function redo(){
    if(canvasStorageRedo.length > 0){
        prepareCanvas();    
        var redo = canvasStorageRedo.pop();
        canvasStorage.push(redo);
        rollbackCanvas();
    }
    else
        alert("Redo not possible. Nothing stored.");
}
    
function undo(){
    if(canvasStorage.length > 0){
        prepareCanvas();
        var undo = canvasStorage.pop();
        canvasStorageRedo.push(undo);    
        rollbackCanvas();
    }
    else
        alert("Undo not possible. No more graphs stored.");
}
    
function rollbackCanvas(){
    // #PETER: Better use
    // for (step in canvasStorage) {
    for (step of canvasStorage){
           i=0;
        // #PETER: Better use 
        // for (property in step) {
        for (property of step){
            var px = property[0],
                py = property[1],
                pColor = property[2],
                pSize = property[3],
                pTool = property[4];
            
            // #PETER: Warning, this would be true even if i is not a number, but the string '0' or even the value 'false'
            // Better use
            // if (i === 0)
            if(i == 0)
            // #PETER: In JavaScript, opening block braces should always start on the same line as the statement
            // and could otherwise lead to funky results. In this case (and since it is your only case), it's fine :)
            {
                context.moveTo(px, py);
            }
            else{
                draw(px,py, pColor,pSize, pTool);
            }
            lastX = px;
            lastY = py;
            i++;
        }
    }
}  
  

/* ######### START::ColorPicker #########*/
    
function drawSelectColorGradient(){
    var canvas = getByClass("selectColorCanvas"),
        context	   = canvas.getContext('2d'), 
        thisWidth  = canvas.width,
        thisHeight = canvas.height,
        gradient = context.createLinearGradient(thisWidth, 0, thisWidth,thisHeight);
    
    gradient.addColorStop(0.000, 'rgba(255, 0, 0, 1.000)');
    gradient.addColorStop(0.169, 'rgba(255, 0, 255, 1.000)');
    gradient.addColorStop(0.330, 'rgba(0, 0, 255, 1.000)');
    gradient.addColorStop(0.490, 'rgba(0, 255, 255, 1.000)');
    gradient.addColorStop(0.670, 'rgba(0, 255, 0, 1.000)');
    gradient.addColorStop(0.840, 'rgba(255, 255, 0, 1.000)');
    gradient.addColorStop(1.000, 'rgba(255, 0, 0, 1.000)');
        
    context.fillStyle = gradient;
    context.fillRect(0, 0, thisWidth, thisHeight);	
}   
    
function moveSelectColorSlider(event){
    
    leftMouseIsClicked = leftMouseClicked(event);
    if(leftMouseIsClicked){
       selectColorHueCanvas(event);
    }
}
    
function clickSelectColorSlider(event){
    selectColorHueCanvas(event);
}

function selectColorHueCanvas(event){
    // Move color selectSelector
    getByClass('selectSelector').style.top = event.offsetY + "px";
    
    // Move color hueSelector to max color
    getByClass('hueSelector').style.left = "180px";
    getByClass('hueSelector').style.top = "100px";

    var rawColor = event.target.getContext('2d').getImageData(1, event.offsetY, 1, 1).data,
    hueRaw = rgbToHsl(rawColor),
    hue = hueRaw[0]*360; // Hsl to hue (360°)

    drawHueGradient(hue); // Create gradient
    foregroundColor = formatRGB(rawColor); //Save to global var
    
    //canvas.style.background = foregroundColor;
    event.target.parentElement.parentElement.parentElement.style.background = foregroundColor;
}
    
function drawHueGradient(hue){
	var canvas = getByClass("hueCanvas"),
        context	   = canvas.getContext('2d'), 
        thisWidth  = canvas.width,
        thisHeight = canvas.height,
        stepHeight = thisHeight/100;
	
    // Loop trough luminance
    // #PETER: Your are modifying 'row' as a global variable!
    // Better use:
    // for (var row = 0; ...)
    for(row=0; row<100; row++){
		var gradient = context.createLinearGradient(0, 0, thisWidth,1);
        // hsl (Hue, Saturation, Luminance)
		gradient.addColorStop(0.01,'hsl('+ hue + ', 0%,  ' + (100 - row) + '%)');
		gradient.addColorStop(1.00,'hsl('+ hue + ', 100%,' + (100 - row) + '%)');
		context.fillStyle = gradient;
		context.fillRect(0, row * stepHeight, thisWidth, thisHeight);
	}	
}

function moveHueGradient(event){
    
    leftMouseIsClicked = leftMouseClicked(event);
    if(leftMouseIsClicked){
       selectForegroundColor(event);
    }
}
    
function clickHueGradient(event){
    selectForegroundColor(event);
}
    
function selectForegroundColor(event){
    
    // Move color hueSelector
    getByClass('hueSelector').style.left = event.offsetX-5 + "px";
    getByClass('hueSelector').style.top = event.offsetY-5 + "px";
    
    var rawColor = event.target.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
    foregroundColor = formatRGB(rawColor);
    event.target.parentElement.parentElement.parentElement.style.background = foregroundColor;
}
    

/* ######### Other functions #########*/
 
function printCanvas(){
    window.print();
}

function changeSize(){
    setSize = getById('size').value;
}

function newFile(){
    window.open("index.html");
}
    
function deleteCanvas(){
    prepareCanvas();
    tmpCanvasStorage = [],
    canvasStorage = [];
}
   
function exportToPNG(){
var canvas = getById("canvas"),
    img    = canvas.toDataURL("image/png"),
    exportWindow = window.open("", "MsgWindow");
    exportWindow.document.write('<img src="'+img+'"/>');
}
    
function selectTool(event){
    getByClass('active').className = '';
    if(event.target.tagName == "IMG"){
        event.target.parentElement.className = 'active';
        tool = event.target.parentElement.id;
    }
    else{
        event.target.className = 'active';
        tool = event.target.id;
    }
}

/***RgbToHsl
This function is based on the stackowerflow answer:
http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgbToHsl(rgb){
    var r = rgb[0]/255, g = rgb[1]/255, b = rgb[2]/255,
    max = Math.max(r, g, b), min = Math.min(r, g, b),
    h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
  

/*################ Event Handler ##############################*/   
getById('newFile').onclick       = newFile;    
getById('delete').onclick        = deleteCanvas;    
getById('print').onclick         = printCanvas;    
getById('canvas').onmousemove    = mouseOnCanvas;
getById('canvas').onclick        = singleClickOnCanvas;
getById('export').onclick        = exportToPNG;
getById('undo').onclick          = undo;
getById('redo').onclick          = redo;
getById('size').onchange         = changeSize;
getById('pen').onclick           = selectTool;    
getById('brush').onclick         = selectTool;    
getById('spray').onclick         = selectTool;
getById('marker').onclick        = selectTool;
getByClass("hueCanvas").onclick  = clickHueGradient;
getByClass("hueCanvas").onmousemove         = moveHueGradient;
getByClass("selectColorCanvas").onclick     = clickSelectColorSlider;
getByClass("selectColorCanvas").onmousemove = moveSelectColorSlider;

drawSelectColorGradient();
drawHueGradient(0);