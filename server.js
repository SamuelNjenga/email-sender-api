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

users = [
  {
    email: process.env.FIRST_EMAIL_TO_TEST,
    name: process.env.FIRST_FIRSTNAME_TO_TEST,
  },
  {
    email: process.env.SECOND_EMAIL_TO_TEST,
    name: process.env.SECOND_FIRSTNAME_TO_TEST,
  },
];

const userEmails = users.map((item) => item.email).join(",");
const userNames = users.map((item) => item.name).join(",");

let mailOptions = {
  from: process.env.EMAIL_TEST,
  to: userEmails,
  subject: "Hey Customer. My Nodemailer Application is out",
  template: "email",
  context: {
    title: "Bravo",
    text: "Favorite Programming Language === JavaScript",
    name: userNames,
  },
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log("It has an error!", err);
  } else {
    console.log("Email has been sent!" + info.response);
  }
});
