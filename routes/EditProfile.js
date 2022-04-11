var express = require("express");
var router = express.Router();
const adminProfileModel = require("../models/adminProfile-model");

//add profile

router.post("/adminProfile", function (req, res, next) {
  var adminName = req.body.adminName;
  var email = req.body.email;
  var address = req.body.address;
  var aboutme = req.body.aboutme;

  let newadminProfile = new adminProfileModel({
    adminName: adminName,
    email: email,
    address: address,
    aboutme: aboutme,
  });

  console.log(newadminProfile);

  newadminProfile.save(function (err, responce) {
    if (err) {
      console.log("Error in Add admin profile", err);
      res.send(err);
    } else {
      res.send({
        message: "Profile Added",
        data: responce,
      });
    }
  });
});

router.get("/getdata", function (req, res, next) {
  adminProfileModel.find(function (err, response) {
    if (err) {
      console.log("You have Error in profile api", err);
      res.send(err);
    } else {
      res.send({
        message: "Here is admin info",
        data: response,
      });
      // res.send(response);
    }
  });
});

router.put("/update", function (req, res, next) {
  const id = "611a1166474feb34a076ed79";
  const adminName = req.body.adminName;
  const email = req.body.email;
  const address = req.body.address;
  const aboutme = req.body.aboutme;

  console.log("ID is ", id);
  adminProfileModel.findByIdAndUpdate(
    id,
    {
      adminName: adminName,
      email: email,
      address: address,
      aboutme: aboutme,
    },

    function (err, response) {
      if (err) {
        console.log("You have Error in Update Profile Api", err);
        res.send(err);
      } else {
        res.send({
          message: "profile data is update",
          data: response,
        });
      }
    }
  );
});

module.exports = router;
