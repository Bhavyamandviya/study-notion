const { Schema, model } = require("mongoose");
const { Types } = Schema;
const SectionSchema = new Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: Types.ObjectId,
      require: true,
      ref: "Subsection",
    },
  ],
});
module.exports = model("Section", SectionSchema);
