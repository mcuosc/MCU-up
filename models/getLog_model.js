const mongoose = require("mongoose");

const CoursesLog = require("./log_model");

module.exports = function getLog() {
  return new Promise(function (resolve, reject) {
    CoursesLog.find(
      {}, 
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
