var express = require('express');
var router = express.Router();
var passport = require("passport");

var User = require("../models/user.model");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin', function(req, res) {
  var messages = req.flash("error");
  res.render('signin', { errors: messages, hasErrors: messages.length > 0 });
});

router.get('/signup', function(req, res) {
  var messages = req.flash("error");
  res.render('signup', { errors: messages, hasErrors: messages.length > 0 });
});

module.exports = router;
