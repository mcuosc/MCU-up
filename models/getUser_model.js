const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;
const CoursesUser = require("./schema/user_model");

module.exports = function getUser(id) {
  return new Promise(function (resolve, reject) {
    CoursesUser.find(
        { "_id" : ObjectId(id)}, 
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
