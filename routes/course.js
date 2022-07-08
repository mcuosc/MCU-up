var express = require('express');
var cors = require('cors');
var router = express.Router();

const CourseMethod = require("../controllers/courses_controller");
const CourseMiddleware = require("../services/course_middleware");
const AuthMiddleware = require("../services/auth_middleware");

var courseMethod = new CourseMethod();
var courseMiddleware = new CourseMiddleware();
var checkAuth = new AuthMiddleware();

router.get("/",courseMethod.getCoursesInfo);
router.get("/async", courseMethod.printCourses);
router.get("/json", cors(), courseMethod.getCoursesInfoJSON);
//router.get("/logs", courseMethod.getCourseLog);


router.route("/:teacher/:subject")
  .get(courseMethod.getCourseInfo)
  .post(checkAuth.authen,courseMiddleware.checkComment,courseMethod.postComment);
  //courseMiddleware.checkCourse, 不確定在檢查什麼
router.get("/:teacher/:subject/json", cors(), courseMethod.getCourseInfoJSON);

router.route("/:teacher/:subject/find")
  .post(checkAuth.author,courseMethod.getMyComment);
router.route("/:teacher/:subject/edit")
  .post(checkAuth.author,courseMiddleware.checkComment,courseMethod.updateMyComment);
router.route("/:teacher/:subject/delete")
  .post(checkAuth.author,courseMethod.deleteMyComment);

module.exports = router;
