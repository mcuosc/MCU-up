const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Course = require('./course_model');

module.exports = function getCourseList(req) {
  let result = {};
  return new Promise(function(resolve, reject) {
    let page = 1;
    if (req.query.page === undefined) page = 1;
    else {
      page = req.query.page;
    }
    let search = "";
    if (req.query.search === undefined) search = "";
    else {
      search = req.query.search;
    }

    const options = {
      page: page,
      limit: 12,
    };
    Course.paginate(
      {
        $or: [
          { "科目.name": { $regex: search } },
          { "科目.id": { $regex: search } },
          { "任課教師.正課": { $regex: search } },
          { "任課教師.實習": { $regex: search } },
          
        ],
      },
      options,
      function (err, result) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          result = { queryCourses: result, search: search/*, isAuthenticated:req.isAuthenticated()*/ };
          resolve(result);
        }
      }
    );
  });
};
