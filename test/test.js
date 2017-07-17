var User = require("../models/user.model");
var expect = require("chai").expect;
var assert = require("assert");
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

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

    it("Deletes user properly",function(done) {
        User.remove({username: "Test"}, done);
    });

    after(function() {
        mongoose.connection.close();
    });
});