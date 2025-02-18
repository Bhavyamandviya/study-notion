// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controller/Course");
// Categories Controllers Import
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controller/Category");
// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controller/SectionController");
// Sub-Sections Controllers Import
const {
  updateSubSection,
  deleteSubsection,
  createSubsection,
} = require("../controller/Subsectioncontroller");
// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllrating,
} = require("../controller/ratingandreviewcontroller");

// Importing Middlewares
const {
  auth,
  isAdmin,
  isInstructor,
  isStudent,
} = require("../middleware/authmiddlware");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubsection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllrating);

module.exports = router;
