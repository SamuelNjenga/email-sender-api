const nodemailer = require("nodemailer");
require("dotenv").config();

const SERVICE_NAME = "gmail";

let mailTransporter = nodemailer.createTransport({
  service: SERVICE_NAME,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_TEST,
    pass: process.env.EMAIL_TEST_APP_PASSWORD,
  },
});

let details = {
  from: process.env.EMAIL_TEST,
  to: process.env.EMAIL_TO_SEND_TEST_TO,
  subject: "My Nodemailer Application is out",
  text: "Bravo.You are our first sender.",
};

mailTransporter.sendMail(details, (err) => {
  if (err) {
    console.log("It has an error!", err);
  } else {
    console.log("Email has been sent!");
  }
});
