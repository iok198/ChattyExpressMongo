import express from "express"
import passport from "passport"
import bodyParser from "body-parser"
import { IncomingForm } from "formidable"

const router = express.Router();

import User from "../models/user.model"

var urlParser = bodyParser.urlencoded({ extended: false })

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

router.post('/signin', urlParser, function (req, res, next) {
  var form = new IncomingForm()

  form.parse(req, (err, { username, password }, files) => {
    console.log(username, password)
  })
  passport.authenticate("signin", (err, user, info) => {
    if (err) {
      return next(err)
    }

    console.log(`${err} ${user} ${Object.keys(info)}`)

    if (!user) {
      return res.json({ success: false, error: info.message })
    }

    req.logIn(user, error => {
      if (error) {
        return next(error)
      }

      // req.user = user

      return res.json({ success: true, error: null })
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

router.post("/tester", function(req, res) {
  var form = new IncomingForm()
  form.parse(req, (err, { username, password }, files) => {
    console.log(`Username: ${username}
    Password: ${password}
    `)
  })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/user/signin");
  }
}

export default router
