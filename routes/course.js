var express = require('express');
var router = express.Router();

const CourseMethod = require("../controllers/courses_controller");

var courseMethod = new CourseMethod();

router.get("/", courseMethod.getCoursesInfo);
router.get("/async", courseMethod.printCourses);
router.get("/json", courseMethod.getCoursesInfoJSON);
//router.get("/logs", courseMethod.getCourseLog);


router.route("/:teacher/:subject")
  .get(courseMethod.getCourseInfo)
  .post(courseMethod.postComment);
router.get("/:teacher/:subject/json", courseMethod.getCourseInfoJSON);

router.route("/:teacher/:subject/find")
  .post(courseMethod.getMyComment);
router.route("/:teacher/:subject/edit")
  .post(courseMethod.updateMyComment);
router.route("/:teacher/:subject/delete")
  .post(courseMethod.deleteMyComment);

module.exports = router;
