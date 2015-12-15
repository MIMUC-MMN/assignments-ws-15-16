var express = require('express');
var router = express.Router();

var notes = require('./notes');

router.use('/notes',notes);

module.exports = router;
