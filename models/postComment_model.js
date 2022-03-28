const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
const CourseRate = require("./schema/rating_model");

const rawdata = require(__dirname + "/../data/class_ids_names.json");
const CourseUser = require("./schema/user_model");

module.exports = function uploadComments(req) {
  let my_department_id = "";
  let isDone = false;
  return new Promise(function (resolve, reject) {
    CourseUser.find({googleID: req.session.passport.user})
    .then( (found) => {
    my_department_id = found[0].username.substr(2,2); // TODO: slice data from req.user

    if (!(rawdata[my_department_id] === req.body.name || req.body.name === "銘傳大學")) {
      reject({
        userID: req.session.passport.user,
        happenAt: decodeURI(req.url),
        errMsg: "name error",
        time: Date.now(),
      });
    }// maybe need to fix something here
    // if (req.isAuthenticated()) {
      CourseRate.insertMany(
        {
          content: req.body.comment,
          name: req.body.name,
          rateHomework: req.body.作業量,
          rateLearning: req.body.豐富度,
          rateRecommendation: req.body.推薦度,
          subject: req.params.subject,
          teacher: req.params.teacher,
          userID: req.user.googleID,
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
    // } else {
    //   resolve(isDone);
    // }
  })
  });
};
