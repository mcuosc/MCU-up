var express = require('express');
var router = express.Router();

const CourseMethod = require("../controllers/courses_controller");
const CourseMiddleware = require("../services/course_middleware");
const checkAuth = require("../services/auth_middleware")

var courseMethod = new CourseMethod();
var courseMiddleware = new CourseMiddleware()

router.get("/",courseMethod.getCoursesInfo);
router.get("/async", courseMethod.printCourses);
router.get("/json", courseMethod.getCoursesInfoJSON);
//router.get("/logs", courseMethod.getCourseLog);


router.route("/:teacher/:subject")
  .get(courseMethod.getCourseInfo)
  .post(checkAuth,courseMiddleware.checkCourse,courseMiddleware.checkComment,courseMethod.postComment);
router.get("/:teacher/:subject/json", courseMethod.getCourseInfoJSON);

router.route("/:teacher/:subject/find")
  .post(checkAuth,courseMethod.getMyComment);
router.route("/:teacher/:subject/edit")
  .post(checkAuth,courseMiddleware.checkComment,courseMethod.updateMyComment);
router.route("/:teacher/:subject/delete")
  .post(checkAuth,courseMethod.deleteMyComment);

module.exports = router;
