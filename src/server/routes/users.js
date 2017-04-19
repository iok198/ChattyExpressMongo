import express from "express"
import passport from "passport"

const router = express.Router();

import User from "../models/user.model"

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
})

router.get('/signin', (req, res) => {
  var messages = req.flash("error");
  res.render('signin', { errors: messages, hasErrors: messages.length > 0 });
});

router.post('/signin', passport.authenticate('signin', {
  failureRedirect: "/user/signin",
  failureFlash: true
}), (req, res) => {
  res.redirect("/user/profile");
  console.log("hello")
});

router.get('/signup', (req, res) => {
  var messages = req.flash("error");
  res.render('signup', { errors: messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('signup', {
  failureRedirect: "/user/signup",
  failureFlash: true
}), (req, res) => {
  res.redirect("/user/profile");
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/user/signin");
  }
}

export default router
