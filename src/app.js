var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require("express-handlebars");  
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var React = require("react");
var ReactDOMServer = require("react-dom/server");

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

mongoose.connect("localhost/ChattyDB");
require("./passport");

// view engine setup
app.engine("hbs", hbs({defaultLayout: "layout", extname: ".hbs"}));
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
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(3000, function() {
  console.log("Server listening in port 3000")
})
