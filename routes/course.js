var express = require('express');
var router = express.Router();

const CourseMethod = require("../controllers/courses_controller");

var courseMethod = new CourseMethod();

router.get("/", courseMethod.getCoursesInfo);
router.get("/async", courseMethod.printCourses);
router.get("/json", courseMethod.getCourseInfoJSON);
//router.get("/logs", courseMethod.getCourseLog);


router.route("/:teacher/:subject")
  .get(courseMethod.getCourseInfo)
  .post(courseMethod.postComment);

router.route("/:teacher/:subject/find")
  .post(courseMethod.getMyComment);
router.route("/:teacher/:subject/edit")
  .post(courseMethod.updateMyComment);
router.route("/:teacher/:subject/delete")
  .post(courseMethod.deleteMyComment);

// for test
router.get("/test",courseMethod.test);
router.get("/testModel/:str",courseMethod.testModel);

module.exports = router;
