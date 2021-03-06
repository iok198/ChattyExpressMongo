import { expect } from "chai"
import request from "supertest"
import jwtDecode from "jwt-decode"
import app from "../src/server/app"
import User from "../src/server/models/user.model"

describe("Authentication tests", () => {
  before(() => {
    var testUser = new User({
      username: "Tester",
      password: "abc123"
    })

    testUser.save((e, newUser) => {})
  })

  it("Logins correctly", done => {
    request(app)
        .post("/user/signin")
        .send({ username: "Tester", password: "abc123" })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) done(err)

          const username = jwtDecode(res.body.token).username

          expect(res.body.success).to.be.true
          expect(username).to.equal("Tester")
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

          const user = jwtDecode(res.body.token)

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
