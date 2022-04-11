var express = require("express");
var router = express.Router();
const firebasePushNotificationModel = require("../models/firebasePushNotification-model");

//add firebaseconfig data

router.post("/post", function (req, res, next) {
  let newfirebasePushNotification = new firebasePushNotificationModel({
    apiKey: req.body.apiKey,
    authDomain: req.body.authDomain,
    databaseURL: req.body.databaseURL,
    projectId: req.body.projectId,
    storageBucket: req.body.storageBucket,
    messagingSenderId: req.body.messagingSenderId,
    appId: req.body.appId,
  });

  console.log(newfirebasePushNotification);

  newfirebasePushNotification.save(function (err, responce) {
    if (err) {
      console.log("Error in Add firebase config api", err);
      res.send(err);
    } else {
      res.send({
        message: "New firebase configration Added",
        data: responce,
      });
    }
  });
});

router.get("/getdata", function (req, res, next) {
  firebasePushNotificationModel.find(function (err, response) {
    if (err) {
      console.log("You have Error in firebase push notification api", err);
      res.send(err);
    } else {
      res.send({
        message: "Here is firebase config info",
        data: response,
      });
      // res.send(response);
    }
  });
});

router.put("/update", function (req, res, next) {
  const id = "61234eb41ad8951f70621edd";
  const apiKey = req.body.apiKey;
  //   const authDomain = req.body.authDomain,
  //   const databaseURL = req.body.databaseURL,
  //   const projectId = req.body.projectId,
  //   const storageBucket = req.body.storageBucket,
  //   const messagingSenderId= req.body.messagingSenderId,
  //   const appId= req.body.appId

  console.log("ID is ", id);
  firebasePushNotificationModel.findByIdAndUpdate(
    id,
    {
      apiKey: apiKey,
      authDomain: req.body.authDomain,
      databaseURL: req.body.databaseURL,
      projectId: req.body.projectId,
      storageBucket: req.body.storageBucket,
      messagingSenderId: req.body.messagingSenderId,
      appId: req.body.appId,
    },

    function (err, response) {
      if (err) {
        console.log("You have Error in Update firebase config Api", err);
        res.send(err);
      } else {
        res.send({
          message: "firebase push notifiacation data is updated",
          data: response,
        });
      }
    }
  );
});

module.exports = router;
