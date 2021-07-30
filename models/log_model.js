const mongoose = require("mongoose");

const courseLog = mongoose.model("Log",{
  userID : String,
  happenAt: String,
  errMsg: String,
  others: String,
  time : Date,
});

module.exports = courseLog;
