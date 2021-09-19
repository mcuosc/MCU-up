// const mongoose = require("mongoose");

// const CourseRate = require("./rating_model");

module.exports = async function(query){
  let result = {};
  result.test = query.str;

  return result;
  // for non-async
  /*return new Promise(function(resolve, reject) {
    resolve(result);
  })*/
}