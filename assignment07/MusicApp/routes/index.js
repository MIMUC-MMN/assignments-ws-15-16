var express = require('express');
var router = express.Router();
var spotify = require('./spotify');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/spotify', spotify);

/* GET ShowVisits page. */
router.get('/showVisits', function(req, res, next) {
	var counter = req.app.locals.counter;
	res.send(counter.getCount());
});


module.exports = router;
