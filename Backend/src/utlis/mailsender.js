const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transpoter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = transpoter.sendMail({
      from: "Toppers Classes",
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mailSender;
