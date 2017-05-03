import express from "express"
import path from "path"
import favicon from "serve-favicon"
import logger from "morgan";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import hbs from "express-handlebars"
import mongoose from "mongoose"
import passport from "passport"
import session from "express-session"
import flash from "connect-flash"
import React from "react"
import ReactDOMServer from "react-dom/server";

import routes from "./routes/index"
import users from "./routes/users"


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("localhost/ChattyDB");

require("./passport")

// view engine setup
app.engine("hbs", hbs({defaultLayout: "layout", extname: ".hbs"}));
app.set('views', path.normalize(__dirname + `/../../views`));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());

app.use(session({
  secret: "mysuperawesomesecretthatnoonecanbreak",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.normalize(`./${__dirname}/../../public`)));

app.use('/', routes);
app.use('/user', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(3000, () => {
  console.log("Server listening in port 3000")
})
