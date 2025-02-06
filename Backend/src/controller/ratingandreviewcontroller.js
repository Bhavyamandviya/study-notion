const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    const courseDetails = await Course.findOne(
      { _id: courseId },
      {
        studentsEnrolled: {
          $elemMatch: { $eq: userId },
        },
      }
    );

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        msg: "Student not enrolled in the course",
      });
    }

    const checkreview = await RatingAndReview.findOne({ user: userId });
    if (checkreview) {
      return res.status(403).json({
        success: false,
        msg: "You have already reviewd the course",
      });
    }

    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      user: userId,
      course: courseId,
    });

    const updatedcourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { ratingAndReviews: ratingReview._id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      msg: "Rating and review created successfully",
      data: ratingReview,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    // get couresId
    const courseId = req.body.courseId;

    //calculate Avg rating

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        msg: "Average Rating",
        data: result[0].averageRating,
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Average rating is zero",
      data: 0,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

exports.getAllrating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();
    return res.status(200).json({
      success: true,
      msg: "Data fectched successfully",
      data: allReviews,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};
