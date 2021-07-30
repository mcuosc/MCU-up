const mongoose = require("mongoose");

const CourseLog = require("../models/log_model");

module.exports = function saveLog(log) {
  
  return new Promise(function (resolve, reject) {
    CourseLog.insertMany(log, (err) => {
      if (err) console.log(err);
      else resolve(true)
    });
  });
};
