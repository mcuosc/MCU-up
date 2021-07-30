const mongoose = require("mongoose");

const courseRating = mongoose.model("Rating",{
  userID : String,
  subject : String,
  teacher : String,
  name : String,
  content : String,
  rateHomework: Number,
  rateLearning: Number,
  rateRecommendation: Number,
  createdAt : Date,
  modifiedAt : Date,
  isHidden: Boolean
});

module.exports = courseRating;
