const { Schema, model } = require("mongoose");
const { Types } = Schema;
const SubsectionSchema = new Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videourl: {
    type: Number,
  },
});
module.exports = model("Subsection", SubsectionSchema);
