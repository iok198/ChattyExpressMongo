import mongoose from "mongoose"
import bcrypt from "bcrypt-nodejs"

mongoose.Promise = global.Promise

let UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
})

UserSchema.methods.validPassword = function (canidatePassword) {
  return bcrypt.compareSync(canidatePassword, this.password)
}

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null)
  next()
})

let User = mongoose.model("User", UserSchema)

export default User
