const { instance } = require("../database/razorpay");

const Course = require("../models/Course");
const user = require("../models/User");
const mailSender = require("../utlis/mailsender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");

// capture the payment and initiate the razorpay order

exports.CapturePayment = async (req, res) => {
  // get courseid and userid
  const { course_Id } = req.body;
  const userId = req.user.id;

  // checking all sort of validation Checking ID's , Already bought by user or not

  if (!course_Id) {
    return res.status(400).json({
      success: false,
      msg: "Please provide valid Courese ID",
    });
  }
  let course;
  try {
    course = await Course.findById(course_Id);

    if (!course) {
      return res.status(400).json({
        success: false,
        msg: "Please provide valid Courese ID",
      });
    }

    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        msg: "Course Already Exist",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }

  // create order and return
  const amount = course.price;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()),
    notes: {
      courseID: course_Id,
      userId,
    },
  };

  try {
    const paymentResponse = instance.orders.create(options);
    console.log("Payment Response", paymentResponse);

    return res.status(200).json({
      success: true,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

//verify signature for payment
exports.verifySignature = async (req, res) => {
  const webHooksecret = "12345678";

  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webHooksecret);
  shasum.update(JSON.stringify(req.body));

  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Match Payment authorised");

    const { courseID, userId } = req.body.payload.payment.entity.notes;

    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseID },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(400).json({
          success: false,
          msg: "Course not found",
        });
      }

      const enrolledStudent = await user.findByIdAndUpdate(
        { _id: userId },
        { $push: { courses: courseID } },
        { new: true }
      );

      const emailresponse = await mailSender(
        enrolledStudent.email,
        "Congratulation",
        "Congratulation"
      );
      return res.status(200).json({
        success: true,

        msg: "signature verified",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      msg: "Signature invalid",
    });
  }
};
