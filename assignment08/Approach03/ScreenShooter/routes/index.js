var express = require('express');
var shoot = require('./shoot');// './' kennzeichnet das das Modul nicht in node_modules liegt
var router = express.Router();

/* Use Module */
router.use('/shoot', shoot);

module.exports = router;
