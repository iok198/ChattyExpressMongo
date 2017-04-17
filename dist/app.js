/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var express = __webpack_require__(1);
	var path = __webpack_require__(2);
	var favicon = __webpack_require__(3);
	var logger = __webpack_require__(4);
	var cookieParser = __webpack_require__(5);
	var bodyParser = __webpack_require__(6);
	var hbs = __webpack_require__(7);
	var mongoose = __webpack_require__(8);
	var passport = __webpack_require__(9);
	var session = __webpack_require__(10);
	var flash = __webpack_require__(11);
	var React = __webpack_require__(12);
	var ReactDOMServer = __webpack_require__(13);

	var routes = __webpack_require__(14);
	var users = __webpack_require__(15);

	var app = express();

	mongoose.connect("localhost/ChattyDB");
	__webpack_require__(18);

	// view engine setup
	app.engine("hbs", hbs({ defaultLayout: "layout", extname: ".hbs" }));
	app.set('views', path.normalize("./" + __dirname + "/../views"));
	app.set('view engine', 'hbs');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());

	app.use(session({
	  secret: "mysuperawesomesecretthatnoonecanbreak",
	  resave: false,
	  saveUninitialized: false
	}));
	app.use(flash());

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(express.static(path.normalize("./" + __dirname + "/../public")));

	app.use('/', routes);
	app.use('/user', users);

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function (err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});

	app.listen(3000, function () {
	  console.log("Server listening in port 3000");
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("express-handlebars");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("connect-flash");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var router = express.Router();

	/* GET home page. */
	router.get('/', function (req, res, next) {
	  res.render('index', { title: 'Express' });
	});

	module.exports = router;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var express = __webpack_require__(1);
	var router = express.Router();
	var passport = __webpack_require__(9);

	var User = __webpack_require__(16);

	/* GET users listing. */
	router.get('/', function (req, res, next) {
	  res.send('respond with a resource');
	});

	router.get('/profile', isLoggedIn, function (req, res) {
	  res.render('profile');
	});

	router.get('/signin', function (req, res) {
	  var messages = req.flash("error");
	  res.render('signin', { errors: messages, hasErrors: messages.length > 0 });
	});

	router.post('/signin', passport.authenticate('signin', {
	  failureRedirect: "/user/signin",
	  failureFlash: true
	}), function (req, res) {
	  res.redirect("/user/profile");
	});

	router.get('/signup', function (req, res) {
	  var messages = req.flash("error");
	  res.render('signup', { errors: messages, hasErrors: messages.length > 0 });
	});

	router.post('/signup', passport.authenticate('signup', {
	  failureRedirect: "/user/signup",
	  failureFlash: true
	}), function (req, res) {
	  res.redirect("/user/profile");
	});

	function isLoggedIn(req, res, next) {
	  if (req.isAuthenticated()) {
	    return next();
	  } else {
	    res.redirect("/user/signin");
	  }
	}

	module.exports = router;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var mongoose = __webpack_require__(8);
	var bcrypt = __webpack_require__(17);

	var UserSchema = new mongoose.Schema({
	    username: { type: String, required: true },
	    password: { type: String, required: true }
	});

	UserSchema.methods.validPassword = function (canidatePassword) {
	    return bcrypt.compareSync(canidatePassword, this.password);
	};

	UserSchema.pre("save", function (next) {
	    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
	    next();
	});

	var User = mongoose.model("User", UserSchema);

	module.exports = User;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("bcrypt-nodejs");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var passport = __webpack_require__(9);
	var LocatStratagy = __webpack_require__(19);
	var User = __webpack_require__(16);

	passport.serializeUser(function (user, done) {
	    done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
	    User.findById(id, function (err, user) {
	        done(err, user);
	    });
	});

	passport.use("signup", new LocatStratagy({
	    usernameField: "username",
	    passwordField: "password",
	    passReqToCallback: true
	}, function (req, username, password, done) {
	    User.findOne({ username: username }, function (err, user) {
	        if (err) {
	            return done(err);
	        }

	        if (user) {
	            return done(null, false, { message: "Username is already taken" });
	        }

	        var newUser = new User({
	            username: username,
	            password: password
	        });

	        newUser.save(function (err, theNewUser) {
	            if (err) {
	                return done(err);
	            }

	            return done(null, theNewUser);
	        });
	    });
	}));

	passport.use("signin", new LocatStratagy({
	    usernameField: "username",
	    passwordField: "password",
	    passReqToCallback: true
	}, function (req, username, password, done) {
	    User.findOne({ username: username }, function (err, user) {
	        if (err) {
	            return done(err);
	        }

	        if (!user) {
	            return done(null, false, { message: "Username not found" });
	        }

	        if (!user.validPassword(password)) {
	            return done(null, false, { message: "Invalid Password" });
	        }

	        return done(null, user);
	    });
	}));

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ }
/******/ ]);