var User = require("../models/user.model");
var expect = require("chai").expect;
var assert = require("assert");
var bcrypt = require("bcrypt-nodejs");

describe("User Tests", function() {
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
            expect(bcrypt.compareSync(user.password, "password")).to.be(true);
        });
    });

    // it("Deletes user properly",function() {
    //     User.remove({username: "Test"}, function(err) {
    //         assert(err, null);
    //     });
    // });
});
