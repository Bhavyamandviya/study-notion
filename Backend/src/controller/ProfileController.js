const Profile = require("../models/Profile");
const user = require("../models/User");
const { uploadImageToCloudinary } = require("../utlis/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    const { gender, contactNumber, about = "", dateofbirth = "" } = req.body;

    const id = req.user.id;

    const userDetails = await user.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    //update profile

    profileDetails.dateofbirth = dateofbirth;
    profileDetails.gender = gender;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();

    return res.status(200).json({
      success: true,
      data: profileDetails,
      msg: "Profile Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Went wrong on",
    });
  }
};

// just check with account to be delete after the schedule time is completed
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await user.findById(userId);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        msg: "User id doesnot match",
      });
    }

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    await user.findByIdAndDelete({ _id: userId });

    return res.status(200).json({
      success: true,
      msg: "Account Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Went wrong on",
    });
  }
};

exports.getuserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await user.findById(id).populate("additionalDetails");

    return res.status(200).json({
      success: true,
      msg: "Data render Successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Something Went wrong on",
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const updatedProfile = await user.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await user
      .findOne({
        _id: userId,
      })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
