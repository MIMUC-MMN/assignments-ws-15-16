var express = require('express');
var router = express.Router();
var shoot = require('./shoot');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/shoot',shoot);

module.exports = router;
