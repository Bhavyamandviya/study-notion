const Section = require("../models/Section");
const Course = require("../models/Course");
const mongoose = require("mongoose");
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(401).json({
        success: false,
        msg: "Fill all the required field",
      });
    }

    const newSection = await Section.create({ sectionName });

    const uid = new mongoose.Types.ObjectId(courseId);
    const updateCourseDetails = await Course.findOneAndUpdate(
      uid,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: updateCourseDetails,
      msg: "Section Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Something Went wrong on",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(401).json({
        success: false,
        msg: "Fill all the required field",
      });
    }

    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: section,
      msg: "Section Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Went wrong on",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body;

    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      msg: "Section Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Went wrong on",
    });
  }
};
