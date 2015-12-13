var express = require('express');
var webshot = require('webshot');
var path = require('path');
var app = express();
var router = express.Router();

app.use(express.static(path.join(__dirname, '../screenshots/')));

var checkWebAdress = function(adress) {

    // www.changkun.us
    // http://changkun.us
    // mailto:somebody@google.com
    // somebody@google.com
    // www.url-with-querystring.com/?url=has-querystring
    var RegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    if (RegExp.test(adress)) {
        return true;
    } else {
        return false;
    }
};

router.get('/screenshots/:filename', function(req, res) {
    console.log(req.params.filename);
    res.sendFile(path.join(__dirname, '../screenshots/' + req.params.filename));
});

router.get('/', function(req, res) {
    var webadress = req.query.url;
    if (checkWebAdress(webadress)) {
        // delete protocol head
        if (webadress.indexOf('//') != -1) {
            webadress = webadress.substr(index+2);
        };
        var filename = webadress + '.png';



        var fullpath = path.join(__dirname, '../screenshots/' + filename);
        webshot(webadress, fullpath, function(err) {
            if (err) {
                res.send({
                    'statu': 'error',
                    'path': null,
                    'message': null
                });
            } else {
                res.send({
                    'statu': 'ok',
                    'path': '/shoot/screenshots/' + filename,
                    'message': 're-used screenshot'
                });
            }
        });
    } else {
        res.send({
                    'statu': 'error',
                    'path': null,
                    'message': null
        });
    }
});

module.exports = router;
