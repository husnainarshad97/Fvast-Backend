var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", () => {
  resizeBy.send("welcome to my form");
});

router.post("/form", (req, res) => {
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "fvastapp@gmail.com",
      pass: "9axdz1t5es",
    },
  });

  let mailOptions = {
    from: "fvastapp@gmail.com",
    to: `${data.email}`,
    subject: `Message from ${data.name} `,
    html: `
      
      <h2>Thanks for using Fvast</h2>
     
  
      <h3>Trip Invoice</h3>
      <ul>
      <li>Name: ${data.name} </li>
      <li>Lastname: ${data.lastname}</li>
      <li>Email: ${data.email}</li>
      </ul>
      <p>${data.message}</p>
  
      `,
  };

  smtpTransport.sendMail(mailOptions, (error, responce) => {
    if (error) {
      res.send(error);
    } else {
      res.send("success");
    }
  });
  smtpTransport.close();
});

module.exports = router;
