var webshot = require('webshot');
var path = require('path');
var fs = require('fs');
var express = require('express');
var router = express.Router();

// prevent overriding by making this a const.
const FILE_TYPE = '.png';

// serving statics via the router, not the app!
router.use('/screenshots', express.static(path.join(__dirname, '../screenshots')));

router.get('/', function (req, res) {
    // we'll populate this later with the response-string
    var response = {
        status : '',
        path : ''
    };

    var target = req.query.url || 'www.mimuc.de';

    // normalize to lower and clean, otherwise we break paths due to '//'
    var filename = target.toLowerCase().replace(/(?:http|https)/, '') + FILE_TYPE;
    var output = path.join(__dirname, '../screenshots', filename);

    /*
     Perform some simple kind of URL-matching; non RFC-complete!

     Matches URLs that maybe have a protocol specified, may begin with www, and end
     a sequence of arbitrary length with a 2-4 char top level domain (TLD)
     */
    var r = /^(?:(?:http|https):\/\/)?(?:www\.)?[a-z0-9-_\.]+(?:\.\w{2,4})$/i;
    var isUrl = r.test(target);

    // we must remember to exit early, otherwise headers will already be sent!
    if (!isUrl) {
        // easter egg :D
        res.json({'path': 'http://www.meme.rumbaar.net/cache/fail/1213522917738.jpg_595.jpg'});
        return;
    }

    // check whether we already scraped the URL before
    fs.exists(output, function (exists) {

        // these properties are used for both responses
        response.status = 'ok';
        // TODO: what if the index.js module changes the path to the shoot module?
        // TS
        response.path = '/shoot/screenshots/' + filename;

        if (exists) {
            response.message = 're-used screenshot';
            res.json(response);
        } else {
            webshot(target, output, function () {
                response.message = 'new screenshot';

                // must be placed in callback; otherwise we send an empty response
                // while waiting for the scrape to finish
                res.json(response);
            });
        }
    });
});

module.exports = router;