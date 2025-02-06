const user = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpgenerator = require("otp-generator");
const mailSender = require("../utlis/mailsender");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("hiii", email);
    // user exist
    const isUSer = await user.findOne({ email });
    if (isUSer) {
      return res.status(401).json({
        success: False,
        msg: "User Already Register",
      });
    }
    //otp generate

    var otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generate", otp);

    // const result = await OTP.findOne({ otp: otp });
    // while (result) {
    //   otp = otpgenerator.generate(6, {
    //     upperCaseAlphabets: false,
    //     lowerCaseAlphabets: false,
    //     specialChars: false,
    //   });
    //   result = await OTP.findOne({ otp: otp });
    // }

    const otpPayload = { email, otp };

    //create entry in db
    const otpbody = await OTP.create(otpPayload);

    return res.status(200).json({
      success: true,
      data: otpbody,
      msg: "OTP send Successfully",
    });
  } catch (error) {
    console.log("while sending otp", error);
    return res.status(500).json({
      success: false,
      msg: "Something went wrong on server",
    });
  }
};

exports.signUp = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;
    // Check if All Details are there or not
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    // Create the Additional Profile For User
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const User = await user.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      data: User,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user with provided email
    const User = await user.findOne({ email }).populate("additionalDetails");

    // If user not found with provided email
    if (!User) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, User.password)) {
      const token = jwt.sign(
        { email: User.email, id: User._id, accountType: User.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in database
      User.token = token;
      User.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        User,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    //get data
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const userdetails = await user.findOne(req.user.id);
    const isPasswordMatch = bcrypt.compare(oldPassword, userdetails.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid Old Password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        success: false,
        msg: "Please Write newPassword and Confirm Password same",
      });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    await user.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
