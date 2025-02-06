const { Schema, model } = require("mongoose");
const { Types } = Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  accountType: {
    type: String,
    require: true,
    enum: ["Admin", "Student", "Instructor"],
  },
  additionalDetails: {
    type: Types.ObjectId,
    require: true,
    ref: "Profile",
  },
  approved: {
    type: Boolean,
    default: true,
  },
  courses: [
    {
      type: Types.ObjectId,
      ref: "Course",
    },
  ],
  image: {
    type: String,
    require: true,
  },
  passtoken: {
    type: String,
  },
  resetPassExpires: {
    type: Date,
  },
  courseProgress: [
    {
      type: Types.ObjectId,
      ref: "CourseProgress",
    },
  ],
});
module.exports = model("user", UserSchema);
