const mongoose = require("mongoose");

const CourseRate = require("./rating_model");

module.exports = function uploadComments(req) {
  //console.log("=",req.params)
  let isDone = false;
  return new Promise(function(resolve, reject) {
    let rateHW = req.body.作業量;
    let rateLN = req.body.豐富度;
    let rateRD = req.body.推薦度;
    if (rateHW===undefined) rateHW=0
    if (rateLN===undefined) rateLN=0
    if (rateRD===undefined ) rateRD=0
    console.log(req.body);
    if (req.isAuthenticated())
      CourseRate.updateOne(
        { teacher: req.params.teacher, subject: req.params.subject, userID: req.session.passport.user, isHidden:false },
        // form 在body裡，在網址的是params！！！
        // form 在body裡，在網址的是params！！！
        // form 在body裡，在網址的是params！！！
        {
          content: req.body.comment,
          rateHomework: rateHW * 1.0,
          rateLearning: rateLN * 1.0,
          rateRecommendation: rateRD * 1.0,
          modifiedAt : Date.now(),
          //hashtag: JSON.parse("["+req.body.hashtag+"]")
        }
      ).then(()=>{
        resolve(isDone);
      })

    else {
      resolve(isDone);
    }
  });
};
