import passport from "passport"
import LocalStratagy from "passport-local"
import User from "./models/user.model"

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use("signup", new LocalStratagy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, (req, usernameField, passwordField, done) => {
    var { username, password } = req.body
    
    User.findOne({ username }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (user) {
            return done(null, false, { message: "Username is already taken" });
        }

        var newUser = new User({
            username,
            password
        });

        newUser.save((err, theNewUser) => {
            if (err) {
                return done(err);
            }

            return done(null, theNewUser);
        });
    });
  

}));

passport.use("signin", new LocalStratagy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, (req, usernameField, passwordField, done) => {
    var { username, password } = req.body

    User.findOne({ username }, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: "Username not found" });
        }

        if (!user.validPassword(password)) {
            return done(null, false, { message: "Invalid Password" })
        }

        return done(null, user)
    });

}));
