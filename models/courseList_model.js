const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Course = require('./course_model');

/*function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};*/

module.exports = function getCourseList(req) {
  let result = {};
  let campus = []
  if ( req.query.campus=== undefined) campus = ["桃園","台北"];
  else campus = JSON.parse(req.query.campus)
  return new Promise(function(resolve, reject) {
    let page = 1;
    if (req.query.page === undefined) page = 1;
    else {
      page = req.query.page;
    }
    let search_str = "";
    let search_regex = ""
    if (req.query.search === undefined) search = "";
    else {
      search_regex = new RegExp(req.query.search/*escapeRegex(req.query.search)*/, 'gi');
      //search = req.query.search;
      search_str = req.query.search
    }
    const options = {
      page: page,
      limit: 16,
    };
    Course.paginate(
      {
          $and:[
            {$or: [
              { "科目.name": { $regex: search_regex } },
              { "科目.id": { $regex: search_regex } },
              { "任課教師.正課": { $regex: search_regex } },
              { "任課教師.實習": { $regex: search_regex } },
            ]},
            { "學校.校區": {$elemMatch: { $in:campus } } } //校區
          ],
      },
      options,
      function (err, result) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          // if (search.length>1) search = search.slice(1,-1)

          result = { queryCourses: result, search: search_str, campus:JSON.stringify(campus) };
          resolve(result);
        }
      }
    );
  });
};
