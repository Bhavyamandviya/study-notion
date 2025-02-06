const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    // extract jwt token
    const token = req.cookies.token || req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // token verfication
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Dont know anything",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is for student",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Pata nhi jii kya chal raha hai",
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is for Instructor",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Pata nhi jii kya chal raha hai",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Pata nhi jii kya chal raha hai",
    });
  }
};
