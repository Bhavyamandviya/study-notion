const Subsection = require("../models/Subsection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utlis/imageUploader");
require("dotenv").config();

exports.createSubsection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, description } = req.body;
    const video = req.files.video;

    // Check if all necessary fields are provided
    if (!sectionId || !title || !description || !video) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required" });
    }

    // Upload the video file to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // Create a new sub-section with the necessary information
    const SubSectionDetails = await Subsection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection");

    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subsectionId, title, timeDuration, description } = req.body;

    if (!subsectionId || !title || !timeDuration || !description) {
      return res.status(401).json({
        success: false,
        msg: "Fill all the required field",
      });
    }

    const SubsectionDetails = await Subsection.findByIdAndUpdate(
      subsectionId,
      { title, description, timeDuration },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: SubsectionDetails,
      msg: "SubSection Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Went wrong on",
    });
  }
};

exports.deleteSubsection = async (req, res) => {
  try {
    const { subsectionId } = req.params;

    await Subsection.findByIdAndDelete(subsectionId);

    return res.status(200).json({
      success: true,
      msg: "Sub Section Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Went wrong on",
    });
  }
};
