const mongoose = require("mongoose");

const CoursesLog = require("./log_model");
const Courses = require("./course_model");
const CoursesUser = require("./user_model");
const CoursesRating = require("./rating_model");
const MongoClient = require("mongodb").MongoClient;

module.exports = function getCount() {
  return new Promise(function (resolve, reject) {
    let query1 = Courses.countDocuments({}, (err, ct) => {
      if (err) {
        console.log(err);
      }
      return ct
    })
    let query2 = CoursesLog.countDocuments({}, (err, ct) => {
      if (err) {
        console.log(err);
      }
      return ct
    })
    let query3 = CoursesUser.countDocuments({}, (err, ct) => {
      if (err) {
        console.log(err);
      }
      return ct
    })
    let query4 = CoursesRating.countDocuments({}, (err, ct) => {
      if (err) {
        console.log(err);
      }
      return ct
    })    
    Promise.all([query1, query2, query3, query4]).then(result => {
      let response = {}
      response.courses = result[0]
      response.logs = result[1]
      response.users = result[2]
      response.ratings = result[2]
      
      resolve(response);
      //console.log(response)
    })

    
    
  });
};
