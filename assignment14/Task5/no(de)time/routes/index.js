var express = require('express');
var year = require('./year');// './' kennzeichnet das das Modul nicht in node_modules liegt
var router = express.Router();

/* Use Module */
router.use('/year', year);

module.exports = router;
