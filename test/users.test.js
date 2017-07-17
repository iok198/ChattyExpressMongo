import User from "../src/server/models/user.model"
import { expect } from "chai"
import mongoose from "mongoose"

describe("User Tests", () => {
  before(() => {
    mongoose.createConnection("localhost/ChattyDB")
  })

  it("Creates user properly", done => {
    var testUser = new User({
      username: "Test",
      password: "password"
    })

    testUser.save((err, user) => {
      if (err) done(err)

      expect(user).to.not.equal(null)
      done()
    })
  })

  it("should hash password correctly", done => {
    User.findOne({username: "Test"}, (err, user) => {
      if (err) done(err)

      expect(user.password).to.not.be.empty
      expect(user.password).to.not.equal("password")
      done()
    })
  })

  it("should compare passwords correctly", done => {
    User.findOne({username: "Test"}, (err, user) => {
      if (err) done(err)

      expect(user.validPassword("password")).to.be.true
      done()
    })
  })

  it("Deletes user properly", done => {
    User.remove({username: "Test"}, err => {
      if (err) done(err)
      else done()
    })
  })

  after(() => {
    mongoose.connection.close()
  })
})
