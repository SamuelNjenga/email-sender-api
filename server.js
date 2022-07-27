require("dotenv").config();
const nodemailer = require("nodemailer");
let hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_TEST,
    pass: process.env.EMAIL_TEST_APP_PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

let mailOptions = {
  from: process.env.EMAIL_TEST,
  to: process.env.EMAIL_TO_SEND_TEST_TO,
  subject: "My Nodemailer Application is out",
  template: "email",
  context: {
    title: "Bravo",
    text: "Favorite Programming Language === JavaScript",
  },
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log("It has an error!", err);
  } else {
    console.log("Email has been sent!" + info.response);
  }
});
