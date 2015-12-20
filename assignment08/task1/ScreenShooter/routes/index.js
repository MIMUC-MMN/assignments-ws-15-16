var express = require('express');
var shoot = require('./shoot');
var router = express.Router();

router.use('/shoot', shoot);

module.exports = router;
