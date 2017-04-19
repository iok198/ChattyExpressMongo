var express = require('express');
var router = express.Router();
var passport = require("passport");

var User = require("../models/user.model");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
})

router.get('/signin', function(req, res) {
  var messages = req.flash("error");
  res.render('signin', { errors: messages, hasErrors: messages.length > 0 });
});

router.post('/signin', passport.authenticate('signin', {
  failureRedirect: "/user/signin",
  failureFlash: true
}), function(req, res) {
  res.redirect("/user/profile");
});

router.get('/signup', function(req, res) {
  var messages = req.flash("error");
  res.render('signup', { errors: messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('signup', {
  failureRedirect: "/user/signup",
  failureFlash: true
}), function(req, res) {
  res.redirect("/user/profile");
});
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/user/signin');
});
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/user/signin");
  }
}

module.exports = router;
