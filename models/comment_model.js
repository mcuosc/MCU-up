const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
const CourseRate = require("./rating_model");

const rawdata = require(__dirname + "/../data/class_ids_names.json");
const CourseUser = require("./user_model");

module.exports = function uploadComments(req) {
  let my_department_id = "";

  let isDone = false;
  return new Promise(function (resolve, reject) {
    CourseUser.find(
      { _id: ObjectId(req.session.passport.user) },
      //{userID:true},
      (err, found) => {
        if (err)
          reject({
            userID: req.session.passport.user,
            happenAt: decodeURI(req.url),
            errMsg: "db error",
            time: Date.now(),
          });
        else {
          my_department_id = found[0].profile.email.slice(2, 4);
          let rateHW = req.body.作業量;
          let rateLN = req.body.豐富度;
          let rateRD = req.body.推薦度;

          if (
           !(rawdata[my_department_id] === req.body.name ||
            req.body.name === "銘傳大學")
          ) {
            reject({
              userID: req.session.passport.user,
              happenAt: decodeURI(req.url),
              errMsg: "name error",
              time: Date.now(),
            });
          }
          if (isNaN(rateHW) || isNaN(rateLN) || isNaN(rateRD)) {
            reject({
              userID: req.session.passport.user,
              happenAt: decodeURI(req.url),
              errMsg: "field error",
              time: Date.now(),
            });
          }

          if (req.isAuthenticated()) {
            rateHW = rateHW * 1.0;
            rateLN = rateLN * 1.0;
            rateRD = rateRD * 1.0;

            if (
              !(
                1 <= rateHW &&
                rateHW <= 5 &&
                1 <= rateLN &&
                rateLN <= 5 &&
                1 <= rateRD &&
                rateRD <= 5
              )
            )
              reject({
                userID: req.session.passport.user,
                happenAt: decodeURI(req.url),
                errMsg: "number range error",
                time: Date.now(),
              });
            CourseRate.insertMany(
              {
                content: req.body.comment,
                name: req.body.name,
                rateHomework: rateHW,
                rateLearning: rateLN,
                rateRecommendation: rateRD,
                subject: req.params.subject,
                teacher: req.params.teacher,
                userID: req.user._id,
                createdAt: Date.now(),
                modifiedAt: Date.now(),
                isHidden: false,
                //hashtag: JSON.parse("["+req.body.hashtag+"]")
              },
              (err) => {
                if (!err) {
                  isDone = true;
                  resolve(isDone);
                }
                reject({
                  userID: req.session.passport.user,
                  happenAt: decodeURI(req.url),
                  errMsg: "db error",
                  time: Date.now(),
                });
              }
            );
          } else {
            resolve(isDone);
          }
        }
      }
    );
  });
};
