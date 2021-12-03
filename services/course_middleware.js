const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
var path = require('path');
const courseRate = require("../models/schema/rating_model");
const courseUser = require("../models/schema/user_model");
const beAGoodGuy = path.join(__dirname, '../views/beAGoodGuy.jpg');

module.exports = class Course {
  checkCourse(req, res, next) {
      courseUser.find({ _id: ObjectId(req.session.passport.user) }, (err, found) => {
        if (err) res.sendFile(beAGoodGuy);
        else {
          next();
        }
      });
  }
  checkComment(req, res, next) {
    // if (req.isAuthenticated()) {
      let rateHW = req.body.作業量;
      let rateLN = req.body.豐富度;
      let rateRD = req.body.推薦度;
      if (
        rateHW === undefined ||
        rateLN === undefined ||
        rateRD === undefined ||
        !(1 <= rateHW && rateHW <= 5 && 1 <= rateLN && rateLN <= 5 && 1 <= rateRD && rateRD <= 5)
      ) {
        res.sendFile(beAGoodGuy);
      } else {
        next();
      }
    // }else{
    //   res.redirect("/auth/login")
    // }
  }
};
