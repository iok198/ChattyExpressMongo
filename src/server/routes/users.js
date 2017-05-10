import express from "express"
import passport from "passport"
import bodyParser from "body-parser"

const router = express.Router();

import User from "../models/user.model"

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/profile', (req, res) => {
  res.render('profile');
})

router.get('/signin', (req, res) => {
  var messages = req.flash("error");
  res.render('signin', { errors: messages, hasErrors: messages.length > 0 });
});

router.post('/signin', function (req, res, next) {

  passport.authenticate("signin", (err, user, info) => {
    if (err) {
      return next(err)
    }

    console.log(err, user, info)

    if (!user) {
      return res.json({ success: false, error: info.message })
    }

    req.logIn(user, error => {
      if (error) {
        return next(error)
      }

      // req.user = user

      return res.json({ success: true, user })
    })
  })(req, res, next)
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
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/user/signin");
  }
}

export default router
