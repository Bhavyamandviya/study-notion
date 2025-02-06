const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authmiddlware");
const {
  deleteAccount,
  updateProfile,
  updateDisplayPicture,
  getEnrolledCourses,
  getuserDetails,
} = require("../controller/ProfileController");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getuserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;
