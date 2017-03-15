var express = require('express');
var router = express.Router();
var shoot = require('./shoot');

<<<<<<< HEAD
// TODO include the shoot module and create a route for it.
var screenshoot = require('./shoot.js');

router.use('/shoot', screenshoot);
=======
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/shoot',shoot);
>>>>>>> MIMUC-MMN/master

module.exports = router;
