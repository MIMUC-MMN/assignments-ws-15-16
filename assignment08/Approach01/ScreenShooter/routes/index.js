var express = require('express');
var router = express.Router();

// TODO include the shoot module and create a route for it.
var screenshoot = require('./shoot.js');

router.use('/shoot', screenshoot);

module.exports = router;
