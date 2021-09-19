const mongoose = require("mongoose");

const Courses = require("./course_model");

module.exports = function getComment(teacher, subject) {
  return new Promise(function (resolve, reject) {
    Courses.find(
      { "任課教師.正課": teacher, "科目.name": subject }, 
      (err, found) => {
        if (err) {
          console.log(err);
          result.status = "Fail to find data.";
        }
        resolve(found);
      }
    );
  });
};
