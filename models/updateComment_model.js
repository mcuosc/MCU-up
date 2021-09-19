const mongoose = require("mongoose");

const CourseRate = require("./rating_model");

module.exports = function uploadComments(findObj,dataObj) {
  //console.log("=",req.params)
  return new Promise(function(resolve, reject) {
    console.log(findObj,dataObj)
      CourseRate.updateOne(
        findObj,dataObj
        // form 在body裡，在網址的是params！！！
        // form 在body裡，在網址的是params！！！
        // form 在body裡，在網址的是params！！！
      ).then(()=>{
        console.log("successful")
        resolve()
      })
  });
};
