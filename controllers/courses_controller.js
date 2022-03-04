const getRating = require("../models/getRating_model");
const getComment = require("../models/getComment_model");
const updateComment = require("../models/updateComment_model");
// const deleteComment = require("../models/deleteComment_model");
const getCourseList = require("../models/getCoursesList_model");
const getCourse = require("../models/getCourses_model");
const saveComment = require("../models/postComment_model");
// const saveLog = require("../models/saveError_model");
// const getLog = require("../models/getLog_model");
// const getUser = require("../models/getUser_model");
// const countDB = require("../models/dbCount_model");
const departments = require("../data/class_ids_names.json");

//const roles = require("../data/roles.json");

const ObjectId = require("mongodb").ObjectID;

module.exports = class Courses {
  getCourseInfo(req, res, next) {
    const query = req.params;
    getCourse(query.teacher, query.subject).then((result) => {
      if (result.length === 0) {
        res.redirect("/courses");
      } else {
        getRating(query).then(
          (result) => {
            let isLogin = typeof req.session.passport !== "undefined";

            if (isLogin) result.me = req.session.passport.user;

            if (req.isAuthenticated()) // TODO: get username by client or other method without this controller
              result.department = departments[req.user.username.substr(2, 2)];
            // I guess it's because need to check user's comment?
            res.render("courses_details", result);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  getCourseInfoJSON(req, res, next) {
    const query = req.params;
    getCourse(query.teacher, query.subject).then((result) => {
      if (result.length === 0) {
        res.redirect("/courses");
      } else {
        getRating(query).then(
          (result) => {
            res.json(result);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  getCoursesInfo(req, res) {
    getCourseList(req).then(
      (result) => {
        res.render("courses", result);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  printCourses(req, res) {
    res.render("courses_async",req.query);
  }

  getCoursesInfoJSON(req, res) {
    getCourseList(req).then(
      (result) => {
        if(result.queryCourses.docs.length === 0) res.status(404).json();
        else res.json(result.queryCourses.docs);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMyComment(req, res) {
      getComment(req.params.teacher, req.params.subject, req.session.passport.user).then(
        (result) => {
          res.json(result);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  updateMyComment(req, res) {
    let findObj = {
      teacher: req.params.teacher,
      subject: req.params.subject,
      userID: req.session.passport.user,
      isHidden: false,
    };
    let dataObj = {
      content: req.body.comment,
      rateHomework: req.body.作業量 * 1.0,
      rateLearning: req.body.豐富度 * 1.0,
      rateRecommendation: req.body.推薦度 * 1.0,
      modifiedAt: Date.now(),
    };
    updateComment(findObj, dataObj).then(() => {
      res.redirect("/courses/" + req.params.teacher + "/" + req.params.subject);
    });
  }
  deleteMyComment(req, res) {
    // if (req.isAuthenticated()) {
      let findObj = {
        teacher: req.params.teacher,
        subject: req.params.subject,
        userID: req.session.passport.user,
        isHidden: false,
      };
      let dataObj = {
        isHidden: true,
        modifiedAt: Date.now(),
      };
      updateComment(findObj, dataObj).then((done) => {
        res.redirect("/courses/" + req.params.teacher + "/" + req.params.subject);
      });
    // }
  }
  postComment(req, res) {
    // if (req.isAuthenticated()) {
      saveComment(req).then(
        (done) => {
          if (done) res.redirect("/courses/" + req.params.teacher + "/" + req.params.subject);
        },
        (err) => {
          // saveLog(err).then((done) => {
          //   if (done) {
          res.send("別再亂玩server拉");
          console.log(err);
          // } else console.log("log error");
          // });
        }
      );
    // } else res.redirect("/auth/login");
  }
  /*getCourseLog(req, res) {
    let isLogin = typeof req.session.passport !== "undefined";


    let check_admin = false;
    //console.log(roles.admin, req.session.passport.user)
    if (isLogin) {
        getUser(req.session.passport.user)
        .then((found) => {

          if (found.length) check_admin = roles.admin.includes(found[0].profile.email.slice(0, 8));
        })
        .then(() => {
          if (check_admin) {
            countDB().then((dbs_counts) => {
              getLog().then((results) => {
                let itemsProcessed = 0;
                if (results.length === 0)
                  res.render("log", { data: [], dbs_counts: dbs_counts });
                else {
                  for (let i = 0; i < results.length; i++) {
                    getUser(results[i].userID).then((found) => {
                      itemsProcessed++;
                      //let departmentID = found[0].profile.email.slice(2, 4);
                      results[i].userID = found[0].profile.email//department_and_IDs[departmentID];
                      if (itemsProcessed === results.length) {
                        res.render("log", {
                          data: results,
                          dbs_counts: dbs_counts,
                        });
                      }
                    });
                  }
                }
              });
            });
          } else {
            res.status(404).render('error');
            //
          }
        });
      } else res.redirect("/auth/login");
  }*/
};
