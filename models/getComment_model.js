const mongoose = require("mongoose");

const CourseRate = require("./rating_model");

module.exports = function getComment(teacher, subject, userID) {
  return new Promise(function (resolve, reject) {
    CourseRate.find(
      { teacher: teacher, subject: subject, userID: userID, isHidden:false }, //{userID:true},
      (err, found) => {
        if (err) {
          console.log(err);
          result.status = "Fail to find data.";
        }
        result = {
          teacherAndSubject: { teacher: teacher, subject: subject },
          data: found,
        };

        resolve(result);
      }
    );
  });
};
