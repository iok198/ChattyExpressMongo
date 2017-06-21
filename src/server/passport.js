import passport from "passport"
import jwt from "jsonwebtoken"
import LocalStratagy from "passport-local"
import User from "./models/user.model"

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use("signup", new LocalStratagy({
  usernameField: "username",
  passwordField: "password",
  session: false,
  passReqToCallback: true

}, (req, username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err)
    }

    if (user) {
      return done({ success: false, message: "Username is already taken" })
    }

    var newUser = new User({
      username,
      password
    })

    newUser.save((err, theNewUser) => {
      if (err) {
        return done(err)
      }

      var token = jwt.sign({ username: theNewUser.username }, "secret-key")

      return done(null, theNewUser, token)
    })
  })
}))

passport.use("signin", new LocalStratagy({
  usernameField: "username",
  passwordField: "password",
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  User.findOne({ username }, function (err, user) {
    if (err) {
      return done(err)
    }

    if (!user) {
      return done({ success: false, message: "Username not found" })
    }

    if (!user.validPassword(password)) {
      return done({ success: false, message: "Invalid Password" })
    }

    var token = jwt.sign({ username: user.username }, "secret-key")

    return done(null, user, token)
  })
}))
