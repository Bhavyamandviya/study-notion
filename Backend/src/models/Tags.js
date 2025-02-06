const { Schema, model } = require("mongoose");
const { Types } = Schema;
const TagSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
  },
  course: [
    {
      type: Types.ObjectId,
      ref: "Course",
    },
  ],
});
module.exports = model("Tag", TagSchema);
