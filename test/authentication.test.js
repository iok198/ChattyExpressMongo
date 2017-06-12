import { expect } from "chai"
import request from "supertest"
import app from "../src/server/app"
import User from "../src/server/models/user.model"

describe("Authentication tests", () => {

  before(() => {
    var testUser = new User({
      username: "Tester",
      password: "abc123"
    })

    testUser.save((err, newUser) => {})
  })

  it("Logins correctly", done => {
    request(app)
        .post("/user/signin")
        .send({ username: "Isaac", password: "cheese123" })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err)

          expect(res.body.success).to.be.true
          expect(res.body.user.username).to.equal("Isaac")
          done()
        })
  })

  it("Signs up correctly", done => {
    request(app)
        .post("/user/signup")
        .send({ username: "Example", password: "abc123" })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err)

          const { user } = res.body

          expect(res.body.success).to.be.true

          expect(user).to.not.be.empty
          expect(user.username).to.equal("Example")

          done()
        })
  })

  after(() => {
    User.findOneAndRemove({username: "Example"}, () => {})
    User.findOneAndRemove({username: "Tester"}, () => {})
  })
})
