// const express = require("express");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const { response } = require("express");

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// app.get("/", () => {
//   resizeBy.send("welcome to my forma");
// });

// app.post("/form", (req, res) => {
//   let data = req.body;
//   let smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     port: 465,
//     auth: {
//       user: "apmsproject2020@gmail.com",
//       pass: "pakistan1947",
//     },
//   });

//   let mailOptions = {
//     from: data.email,
//     to: "apmsproject2020@gmail.com",
//     subject: `Message from ${data.name} `,
//     html: `

//     <h3>Informations</h3>
//     <ul>
//     <li>Name: ${data.name} </li>
//     <li>Lastname: ${data.lastname}</li>
//     <li>Email: ${data.email}</li>
//     </ul>

//     <h3>Message</h3>
//     <p>${data.message}</p>

//     `,
//   };

//   smtpTransport.sendMail(mailOptions, (error, responce) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send("success");
//     }
//   });
//   smtpTransport.close();
// });
