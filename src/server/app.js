import express from "express"
import path from "path"
import logger from "morgan"
import bodyParser from "body-parser"
import hbs from "express-handlebars"
import mongoose from "mongoose"
import passport from "passport"
import socketIO from "socket.io"
import http from "http"

import routes from "./routes/index"
import users from "./routes/users"
import config from "../../config"

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect("localhost/ChattyDB")

require("./passport")

// view engine setup
app.engine("hbs", hbs({defaultLayout: "layout", extname: ".hbs"}))
app.set('views', path.join(__dirname, "..", "..", "views"))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
//  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger((config.nodeEnv == "production") ? "prod" : "dev"))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.normalize(`./${__dirname}/../../public`)))

app.use('/', routes)
app.use('/user', users)

io.on("connection", socket => {
  console.log("A socket connected")

  socket.on("msg", msg => {
    console.log(`${msg.username} said: "${msg.message}"`)

    io.emit("msg", msg)
  })

  socket.on("disconnect", () => {
    console.log("A socket disconnected")
  })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

server.listen(3000, () => {
  console.log(`Server listening on http://${config.host}:${config.port}`)
})

export default app
