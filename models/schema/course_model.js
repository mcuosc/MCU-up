const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const courseSchema = new mongoose.Schema({
  course_id: String,
  course_name: String,
  class_id: String,
  teacher_list: [],
  course_grade: String,
  course_type: Number,
  classroom: [],
  campus: [],
  semester: Number,
  credits: Number,
  special_type: String,
  isgraduate: Boolean,
  comments: String,
  course_hash: String,
  super_hash: String,
});

courseSchema.plugin(mongoosePaginate);

const course = mongoose.model("Course", courseSchema);

module.exports = course;
