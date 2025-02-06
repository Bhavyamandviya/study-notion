const { Schema, model } = require("mongoose");
const mailSender = require("../utlis/mailsender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const { Types } = Schema;
const OTPSchema = new Schema({
  otp: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

// send mail function for verification
async function sendVerificationMail(email, otp) {
  console.log("bhaii", email);
  try {
    const mailResponse = await mailSender(
      email,
      "Verification of Email",
      emailTemplate(otp)
    );
    console.log("Email sent successfully: ", mailResponse.response);
  } catch (error) {
    console.log("sendverification mail", error.message);
    // throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationMail(this.email, this.otp);
  }
  next();
});

module.exports = model("OTP", OTPSchema);
