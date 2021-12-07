const mongoose = require("mongoose");

const CourseRate = require("./schema/rating_model");

module.exports = function getComment(teacher, subject, userID) {
  return new Promise(function (resolve, reject) {
    CourseRate.find(
      { teacher: teacher, subject: subject, userID: userID, isHidden:false }, //{userID:true},
      (err, found) => {
        if (err) {
          console.log(err);
          result.status = "Fail to find data.";
          reject(result);
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
