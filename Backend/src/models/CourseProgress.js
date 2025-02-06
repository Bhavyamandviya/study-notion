const { Schema, model } = require("mongoose");
const { Types } = Schema;
const CourseProgressSchema = new Schema({
  courseID: {
    type: Types.ObjectId,
    ref: "Course",
  },
  completedVideo: [
    {
      type: Types.ObjectId,
      ref: "Subsection",
    },
  ],
});
module.exports = model("CourseProgress", CourseProgressSchema);
