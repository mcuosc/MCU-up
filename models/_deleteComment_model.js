const mongoose = require("mongoose");

const CourseRate = require("./schema/rating_model");

module.exports = function uploadComments(req) {
  let isDone = false;
  return new Promise(function(resolve, reject) {
    let rateHW = req.body.作業量;
    let rateLN = req.body.豐富度;
    let rateRD = req.body.推薦度;
    if (rateHW===undefined) rateHW=0
    if (rateLN===undefined) rateLN=0
    if (rateRD===undefined ) rateRD=0
    if (req.isAuthenticated())
      CourseRate.updateOne(
        { teacher: req.params.teacher, subject: req.params.subject, userID: req.session.passport.user , isHidden: false},
        // form 在body裡，在網址的是params！！！
        // form 在body裡，在網址的是params！！！
        // form 在body裡，在網址的是params！！！
        {
          isHidden: true,
          modifiedAt : Date.now()
        }
      ).then(()=>{
        resolve(isDone);
      })

    else {
      resolve(isDone);
    }
  });
};
