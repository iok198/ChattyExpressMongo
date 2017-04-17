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

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _serveFavicon = __webpack_require__(3);

	var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

	var _morgan = __webpack_require__(4);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _cookieParser = __webpack_require__(5);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _bodyParser = __webpack_require__(6);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _expressHandlebars = __webpack_require__(7);

	var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

	var _mongoose = __webpack_require__(8);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _passport = __webpack_require__(9);

	var _passport2 = _interopRequireDefault(_passport);

	var _expressSession = __webpack_require__(10);

	var _expressSession2 = _interopRequireDefault(_expressSession);

	var _connectFlash = __webpack_require__(11);

	var _connectFlash2 = _interopRequireDefault(_connectFlash);

	var _react = __webpack_require__(12);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(13);

	var _server2 = _interopRequireDefault(_server);

	var _index = __webpack_require__(14);

	var _index2 = _interopRequireDefault(_index);

	var _users = __webpack_require__(15);

	var _users2 = _interopRequireDefault(_users);

	__webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();

	_mongoose2.default.connect("localhost/ChattyDB");


	// view engine setup
	app.engine("hbs", (0, _expressHandlebars2.default)({ defaultLayout: "layout", extname: ".hbs" }));
	app.set('views', _path2.default.normalize("./" + __dirname + "/../../views"));
	app.set('view engine', 'hbs');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use((0, _cookieParser2.default)());

	app.use((0, _expressSession2.default)({
	  secret: "mysuperawesomesecretthatnoonecanbreak",
	  resave: false,
	  saveUninitialized: false
	}));
	app.use((0, _connectFlash2.default)());

	app.use(_passport2.default.initialize());
	app.use(_passport2.default.session());

	app.use(_express2.default.static(_path2.default.normalize("./" + __dirname + "/../../public")));

	app.use('/', _index2.default);
	app.use('/user', _users2.default);

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
	/* WEBPACK VAR INJECTION */}.call(exports, "src\\server"))

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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	/* GET home page. */
	router.get('/', function (req, res, next) {
	  res.render('index', { title: 'Express' });
	});

	exports.default = router;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(9);

	var _passport2 = _interopRequireDefault(_passport);

	var _user = __webpack_require__(16);

	var _user2 = _interopRequireDefault(_user);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

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

	router.post('/signin', _passport2.default.authenticate('signin', {
	  failureRedirect: "/user/signin",
	  failureFlash: true
	}), function (req, res) {
	  res.redirect("/user/profile");
	});

	router.get('/signup', function (req, res) {
	  var messages = req.flash("error");
	  res.render('signup', { errors: messages, hasErrors: messages.length > 0 });
	});

	router.post('/signup', _passport2.default.authenticate('signup', {
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

	exports.default = router;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mongoose = __webpack_require__(8);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _bcryptNodejs = __webpack_require__(17);

	var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var UserSchema = new _mongoose2.default.Schema({
	    username: { type: String, required: true },
	    password: { type: String, required: true }
	});

	UserSchema.methods.validPassword = function (canidatePassword) {
	    return _bcryptNodejs2.default.compareSync(canidatePassword, this.password);
	};

	UserSchema.pre("save", function (next) {
	    this.password = _bcryptNodejs2.default.hashSync(this.password, _bcryptNodejs2.default.genSaltSync(10), null);
	    next();
	});

	var User = _mongoose2.default.model("User", UserSchema);

	exports.default = User;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("bcrypt-nodejs");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _passport = __webpack_require__(9);

	var _passport2 = _interopRequireDefault(_passport);

	var _passportLocal = __webpack_require__(19);

	var _passportLocal2 = _interopRequireDefault(_passportLocal);

	var _user = __webpack_require__(16);

	var _user2 = _interopRequireDefault(_user);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_passport2.default.serializeUser(function (user, done) {
	    done(null, user.id);
	});

	_passport2.default.deserializeUser(function (id, done) {
	    _user2.default.findById(id, function (err, user) {
	        done(err, user);
	    });
	});

	_passport2.default.use("signup", new _passportLocal2.default({
	    usernameField: "username",
	    passwordField: "password",
	    passReqToCallback: true
	}, function (req, username, password, done) {
	    _user2.default.findOne({ username: username }, function (err, user) {
	        if (err) {
	            return done(err);
	        }

	        if (user) {
	            return done(null, false, { message: "Username is already taken" });
	        }

	        var newUser = new _user2.default({
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

	_passport2.default.use("signin", new _passportLocal2.default({
	    usernameField: "username",
	    passwordField: "password",
	    passReqToCallback: true
	}, function (req, username, password, done) {
	    _user2.default.findOne({ username: username }, function (err, user) {
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