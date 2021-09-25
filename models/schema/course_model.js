const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const courseSchema = new mongoose.Schema({
  制別: String,
  科目: {},
  班級: String,
  開班_選課人數: String,
  任課教師: {},
  上課日期_節次: [],
  年級: String,
  學校: {},
  選別: String,
  學分: String,
  類別: String,
  畢業班: String,
  學期數: String,
  說明: String,
});

courseSchema.plugin(mongoosePaginate);

const course = mongoose.model("Course", courseSchema);

module.exports = course;
