/*Includes*/
var express = require('express'),
    path = require('path'),
    webshot = require('webshot'),
    fs = require('fs'),
    http = require('http');

var router = express.Router();

var absolutePath = path.join(__dirname, '../screenshots');          // Get directory screenshots
router.use(express.static(absolutePath));                           // Use directory

/* GET home page. */
router.get('/', function(req, res) {                                // respond with "hello world" when 
                                                                    // a GET request is made to the homepage
    /* Get lookedup url */
    var url = req.query.url,                                        //.url is key of getRequest
        fileName = url + '.png',                                    // Filename with extension (store as .png)
        absSoragePath = path.join(absolutePath, fileName),          // Absolute storage path
        relativePath  = path.join('/shoot/', fileName),             // Relative storage path
        returnObj     = {"status": {                     
                        "code": 200 ,                               // Status code HTTP/1.1 specification
                        "status": 'ok' },                           // readable status
                        "path" : null,                              // Path to img
                        "message": null                             // Description     
        };
    /* If file already exists*/ 
    if (fs.existsSync(absSoragePath)){ 
        returnObj.path = relativePath;                              // Prepeare path property of return object
        returnObj.message = "re-used screenhot";                    // Prepeare message property of return object
        res.send(returnObj);                                        // Return JSON
    } 
    else if(url !== undefined && url.length!==0){
        /*Detemine wether the URL exists, if exists take screenshot*/
        var options = {method: 'HEAD', host: url, port: 80, path: '/'},
            req = http.request(options, function(r) {
                
            // Take the screenshot
            webshot(url, absSoragePath, function(err) {
                // Error handling
                if(err === null){
                    returnObj.path = relativePath;                      // Prepeare path property of return object
                    returnObj.message = "new-fetched screenhot";        // Prepeare message property of return object
                    res.send(returnObj);                                // Return JSON
                }
                else{
                    console.log(err);                                   // Output error in console
                    returnObj.status.code = "500";                      // Prepeare status property of return object          
                    returnObj.status.status = "Internal server error";  // Prepeare message property of return object        
                    returnObj.message = 
                    "An unexpected error occured, while fetching image";// Prepeare message property of return object
                    }
            });    
        });

        /*Error handler not existing pages*/
        req.on('error', function(err) {
            notFound(returnObj);                                    // Manipulate return object
            res.send(returnObj);                                    // Return JSON
        });
        req.end();      
    }
    
    else{                                                           //* If undefinded or string length equals 0*/ 
        notFound(returnObj)                                         // Manipulate return object
        res.send(returnObj);                                        // Return JSON
    }
    

});

module.exports = router;

/*Function notFound to prevent code duplicate*/
function notFound(returnObj){
    returnObj.status.code = "404";                          // Prepeare status property of return object              
    returnObj.status.status = "Not found";                  // Prepeare message property of return object
    returnObj.message =                                     // Prepeare message property of return object
                    "The requested URL does not exist";             
}
