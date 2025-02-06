const user = require("../models/User");
const mailSender = require("../utlis/mailsender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(401).json({
        success: False,
        msg: "Email not registered",
      });
    }

    const token = crypto.randomUUID();
    const updatedDetails = await user.findOneAndUpdate(
      { email },
      {
        passtoken: token,
        resetPassExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset Link",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    return res.status(200).json({
      success: true,
      msg: "Mail sent to your registered Email",
    });
  } catch (error) {
    console.log("Forgot password Error", error);
    return res.status(401).json({
      success: False,
      msg: "Something went wrong on server",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }
    const userDetails = await user.findOne({ passtoken: token });
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      });
    }
    if (!(userDetails.resetPassExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await user.findOneAndUpdate(
      { passtoken: token },
      { password: encryptedPassword },
      { new: true }
    );
    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
