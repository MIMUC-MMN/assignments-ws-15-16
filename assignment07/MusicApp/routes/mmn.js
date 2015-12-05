var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var myDate = new Date();
	var mySeconds = myDate.getTime();
	res.json({
		date: myDate,
		milis: mySeconds
	});
});

module.exports = router;
