const getCourses = require("../models/courseDetail_model");
const getComment = require("../models/getComment_model");
const updateComment = require("../models/updateComment_model");
// const deleteComment = require("../models/deleteComment_model");
const getCourseList = require("../models/courseList_model");
const getCourse = require("../models/getCourses_model");
const saveComment = require("../models/comment_model");
// const saveLog = require("../models/saveError_model");
// const getLog = require("../models/getLog_model");
// const getUser = require("../models/getUser_model");
// const countDB = require("../models/dbCount_model");
const checkComment = require("../models/checkComment_model");
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
        getCourses(query).then(
          (result) => {
            let isLogin = typeof req.session.passport !== "undefined";

            if (isLogin) result.me = req.session.passport.user;

            if (req.isAuthenticated())
              result.department =
                departments[req.user.profile.email.substr(2, 2)];

            res.render("courses_details", result);
            //res.json(result);
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
        getCourses(query).then(
          (result) => {
            let isLogin = typeof req.session.passport !== "undefined";

            if (isLogin) result.me = req.session.passport.user;

            if (req.isAuthenticated())
              result.department =
                departments[req.user.profile.email.substr(2, 2)];

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
    res.render("courses_async");
  }

  getCoursesInfoJSON(req, res) {
    getCourseList(req).then(
      (result) => {
        res.json(result.queryCourses.docs);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMyComment(req, res) {
    if (typeof req.session.passport !== "undefined") {
      getComment(
        req.params.teacher,
        req.params.subject,
        req.session.passport.user
      ).then(
        (result) => {
          res.json(result);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      res.status(403).send("need login.");
    }
  }
  updateMyComment(req, res) {
    if(req.isAuthenticated()){
      let rateHW = req.body.作業量;
      let rateLN = req.body.豐富度;
      let rateRD = req.body.推薦度;
      if (rateHW===undefined) rateHW=0
      if (rateLN===undefined) rateLN=0
      if (rateRD===undefined ) rateRD=0
      let findObj = {
        teacher: req.params.teacher, 
        subject: req.params.subject, 
        userID: req.session.passport.user, 
        isHidden:false ,
      }
      let dataObj = {
          content: req.body.comment,
          rateHomework: rateHW * 1.0,
          rateLearning: rateLN * 1.0,
          rateRecommendation: rateRD * 1.0,
          modifiedAt : Date.now(),
      }
      updateComment(findObj,dataObj).then(() => {
        res.redirect("/courses/" + req.params.teacher + "/" + req.params.subject);
    });}
  }
  deleteMyComment(req, res) {
    if (req.isAuthenticated()){
      let findObj = {
        teacher: req.params.teacher, 
        subject: req.params.subject, 
        userID: req.session.passport.user , 
        isHidden: false
      }
      let dataObj = {
        isHidden: true,
        modifiedAt : Date.now()
      }
      updateComment(findObj,dataObj).then((done) => {
        res.redirect("/courses/" + req.params.teacher + "/" + req.params.subject);
      });
    }
  }
  postComment(req, res) {
    if (req.isAuthenticated()) {
      checkComment(req).then((req)=>{
        saveComment(req).then(
          (done) => {
            if (done)
              res.redirect(
                "/courses/" + req.params.teacher + "/" + req.params.subject
              );

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
      })
    } else  res.redirect("/auth/login");
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
