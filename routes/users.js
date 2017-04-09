var express = require('express');
var router = express.Router();
var passport = require("passport");

var User = require("../models/user.model");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
