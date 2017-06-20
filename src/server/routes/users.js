import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.post('/signin', function (req, res, next) {
  passport.authenticate("signin", (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.json({ success: false, error: info.message })
    }

    req.logIn(user, error => {
      if (error) {
        return next(error)
      }

      var token = jwt.sign({ username: user.username }, "secret-key")

      return res.json({ success: true, token })
    })
  })(req, res, next)
})

router.post('/signup', (req, res) => {
  passport.authenticate("signup", (err, newUser, info) => {
    if (err) {
      return res.json({ success: false, error: err.message })
    }

    if (info) {
      return res.json({ success: false, error: info.message })
    }

    req.logIn(newUser, error => {
      if (error) {
        return res.json({ success: false, error })
      }

      var token = jwt.sign({ username: newUser.user }, "secret-key")

      return res.json({
        success: true,
        token
      })
    })
  })(req, res)
})

export default router
