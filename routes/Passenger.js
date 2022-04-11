const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passengerModel = require("../models/passenger-model");
const { response } = require("express");

router.post("/signUp", (req, res, next) => {
  passengerModel
    .find({ email: req.body.email })
    .exec()
    //new
    // .then((newpassenger) => {
    .then((newpassenger) => {
      if (newpassenger.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            promoCode = req.body.promoCode;
            //PROMO WORK START
            passengerModel
              .find({ _id: promoCode })
              .exec()
              // .then((oldpassenger) => {
              .then((newpassenger) => {
                if (newpassenger.length >= 1) {
                  const newpassenger = new passengerModel({
                    _id: new mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    phone: req.body.phone,
                  });
                  newpassenger
                    .save()
                    .then((result) => {
                      console.log(result);
                      res.status(201).json({
                        message:
                          "You have successfully signed up and you will get promotions and discounts and Noman Raja will get benefits also",

                        data: result,
                      });
                    })

                    .catch((err) => {
                      console.log(err);
                      res.status(500).json({
                        error: err,
                      });
                    });
                } else {
                  res.send({
                    message: "Promo code doesn't exists",
                  });
                }
              });
            //promo work END
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  passengerModel
    .find({ email: req.body.email })
    .exec()
    .then((passenger) => {
      if (passenger.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(
        req.body.password,
        passenger[0].password,
        (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: passenger[0].email,
                passengerID: passenger[0]._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );

            return res.status(200).json({
              message: "Auth successful",
              token: token,
            });
          }
          res.status(401).json({
            message: "Auth failed",
          });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/get", function (req, res, next) {
  passengerModel.find(function (err, response) {
    if (err) {
      console.log("You have Error in passenger Model api", err);
      res.send(err);
    } else {
      res.send({
        message: "Here is  passenger Model",
        data: response,
      });
    }
  });
});
router.get("/getInTable", function (req, res, next) {
  passengerModel
    .find()
    .select("_id firstName lastName phone email")
    .exec()
    .then((responce) => {
      responce = JSON.parse(JSON.stringify(responce));
      let x = 1;
      responce.forEach((element) => {
        element.id = x;
        x++;
      });
      res.send({
        message: "Get passenger Data is",
        data: responce,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/getDataforHeader", function (req, res, next) {
  passengerModel
    .find()
    .exec()
    .then((responce) => {
      res.send({
        message: "Get passenger Data is",
        data: responce.length,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.delete("/passengerID", (req, res, next) => {
  passengerModel
    .remove({ _id: req.params.passengerId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Passenger deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
