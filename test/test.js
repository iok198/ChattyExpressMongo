import User from "../src/server/models/user.model"
import { expect } from "chai"
import assert from "assert"
import bcrypt from "bcrypt-nodejs"
import mongoose from "mongoose"

describe("User Tests", function() {

    before(function() {
        mongoose.connect("localhost/ChattyDB")
    });

    it("Creates user properly", function() {
        var testUser = new User({
            username: "Test",
            password: "password"
        });

        testUser.save(function(err, user) {
            expect(err).to.be(null);
            expect(user).to.not.be(null);
        });
    });


    it("should hash password correctly", function() {
        User.findOne({username: "Test"}, function(err, user) {
            expect(err).to.be(null);

            expect(user.password).to.not.be.empty();
            expect(user.password).to.not.equal("password");
        });
    });

    it("should compare passwords correctly", function() {
        User.findOne({username: "Test"}, function(err, user) {
            expect(user.validPassword(user.password)).to.be(true);
        });
    });

    it("Deletes user properly",function() {
        User.remove({username: "Test"}, function(err) {
            assert(err, null);
        });
    });

    after(function() {
        mongoose.connection.close();
    });
});
