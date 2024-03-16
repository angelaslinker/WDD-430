// var express = require("express");
// var router = express.Router();
// router.get('/', function (req, res, next) {
//   res.render('index', { title: "CMS" });
// });
// module.exports = router;

var express = require('express');
var router = express.Router();
const path = require('path'); // Import the path module

// Serve static files from the 'dist/cms/browser' directory
router.use(express.static(path.join(__dirname, '../..', 'dist/cms/browser')));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../..', 'dist/cms/browser/') });
});

module.exports = router;