import User from "../src/server/models/user.model"
import { expect } from "chai"
import mongoose from "mongoose"

describe("User Tests", function () {
  before(function () {
    mongoose.connect("localhost/ChattyDB")
  })

  it("Creates user properly", function (done) {
    var testUser = new User({
      username: "Test",
      password: "password"
    })

    testUser.save(function (err, user) {
      if (err) done(err)

      expect(user).to.not.be.equal(null)
      done()
    })
  })

  it("should hash password correctly", function (done) {
    User.findOne({username: "Test"}, function (err, user) {
      if (err) done(err)

      expect(user.password).to.not.be.empty
      expect(user.password).to.not.equal("password")
      done()
    })
  })

  it("should compare passwords correctly", function (done) {
    User.findOne({username: "Test"}, function (err, user) {
      if (err) done(err)

      expect(user.validPassword("password")).to.be.true
      done()
    })
  })

  it("Deletes user properly", function (done) {
    User.remove({username: "Test"}, function (err) {
      if (err) done(err)
      else done()
    })
  })

  after(function () {
    mongoose.connection.close()
  })
})
