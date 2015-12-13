var express = require('express');
var webshot = require('webshot');
var path = require('path');
var app = express();
var router = express.Router();

app.use(express.static(path.join(__dirname, '../screenshots/')));

var checkWebAdress = function(adress) {
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

    var result = checkWebAdress(webadress);
    if (result) {
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
