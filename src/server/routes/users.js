import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

import User from "../models/user.model"

const router = express.Router()

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource")
})

router.post("/signin", function (req, res, next) {
  passport.authenticate("signin", (err, user, token) => {
    if (err) {
      return res.json(err)
    }

    req.logIn(user, error => {
      if (error) {
        return next(error)
      }

      return res.json({ success: true, token })
    })
  })(req, res, next)
})

router.post("/signup", (req, res) => {
  passport.authenticate("signup", (err, newUser, token) => {
    if (err) {
      return res.json(err)
    }

    req.logIn(newUser, error => {
      if (error) {
        return res.json({ success: false, error })
      }

      return res.json({
        success: true,
        token
      })
    })
  })(req, res)
})

router.post("/verify", (req, res) => {
  const token = req.body.token

  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.json({ authorized: false })
    }

    User.findOne({username: decoded.username}, (userError, user) => {
      if (userError) {
        return res.json({ authorized: false })
      }

      return res.json({ authorized: true })
    })
  })
})

export default router
