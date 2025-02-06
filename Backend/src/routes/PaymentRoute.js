// Import the required modules
const express = require("express");
const router = express.Router();

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middleware/authmiddlware");
const { CapturePayment, verifySignature } = require("../controller/Payment");

router.post("/capturePayment", auth, isStudent, CapturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;
