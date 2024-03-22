var express = require('express');
var path = require('path');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('Root route accessed');
  res.sendFile(path.join(__dirname, '../../../src/index.html'));
});

module.exports = router;
