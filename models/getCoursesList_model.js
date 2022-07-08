const mongoose = require("mongoose");

const Courses = require('./schema/course_model');

module.exports = function getCourseList(req) {
  let result = {};
  let campus = []
  if (req.query.campus === undefined || req.query.campus === '') campus = ["桃園", "台北", "成功", "基河", "金門"];
  else campus = JSON.parse(req.query.campus)
  return new Promise(function (resolve, reject) {
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
    let pageNumber = page;
    let nPerPage = 16;
    Courses.find(
      {
        $and:[
          {
            $or: [
              {"course_name": { $regex: search_regex}},
              {"course_id": { $regex: search_regex}},
              {"class_id": { $regex: search_regex}},
              {"teacher_list.teacher_name": { $regex: search_regex}},
            ]
          },
          { "campus": { $elemMatch: { $in: campus } } } //校區
        ],
      },
      (err, result) => {
        if (err) {
          console.log(err);
          result.status = "Fail to find data.";
        }
        // console.log(result);
        result = { queryCourses: { docs: result }, search: search_str, campus: JSON.stringify(campus) };
        resolve(result);
      }
    )
    .sort({})
    .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
    .limit(nPerPage);
  });
};
