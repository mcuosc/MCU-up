const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  googleID: String
});

userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema);
