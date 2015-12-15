var express = require('express');
var router = express.Router();
var spotify = require('./spotify');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/spotify', spotify);

module.exports = router;
