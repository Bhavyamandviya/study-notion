const { Schema, model } = require("mongoose");
const { Types } = Schema;
const ProfileSchema = new Schema({
  gender: {
    type: String,
  },
  dateofbirth: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
});
module.exports = model("Profile", ProfileSchema);
