/*Includes*/
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();          // Important, don't forget to import

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/year',function(req,res){
 res.json({
 year : new Date().getFullYear()
 });
});

app.get('/time',function(req,res){
    var request = req.query,            // GET Parameter, Übergabe als String
        date = new Date(),              // Create date object
        hours = date.getHours(),        // Get hours
        minutes = date.getMinutes(),    // Get minutes
        returnObj = new Object();       // Create return object 
        
        returnObj.date= date;           // and add current time
    
    // Falls Stunde gewünscht
    if(request.hours === "1")          // Attention: GETParameter are strings
        returnObj.hours = hours;        // Add hour to returnObject
   
    // Falls Minute gewünscht
    if(request.minutes === "1")
        returnObj.minutes = minutes;    // Add minutes to returnObject
    
     res.json(returnObj);               // Retrun object (will be returned as JSON)

});

module.exports = router;                // Expose module
app.listen(1337);                       //Bind to port