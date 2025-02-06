const { Schema, model } = require("mongoose");
const { Types } = Schema;
const RatingAndReviewSchema = new Schema({
  rating: {
    type: Number,
    require: true,
  },
  review: {
    type: String,
    require: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "user",
    require: true,
  },
  course: {
    type: Types.ObjectId,
    require: true,
    ref: "Course",
    index: true,
  },
});
module.exports = model("RatingAndReview", RatingAndReviewSchema);
