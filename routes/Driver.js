const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var driverModel = require("../models/driver-model");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let name = Math.round(new Date().getTime() / 1000) + file.originalname;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    req.Filerror = "FileNotSupported";
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3, // 3MB
  },
  fileFilter: fileFilter,
});

router.post("/signUp", upload.single("driverImage"), (req, res, next) => {
  driverModel
    .find({ email: req.body.email })
    .exec()
    .then((driver) => {
      if (driver.length >= 1) {
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
            // console.log(req.file);
            const driver = new driverModel({
              _id: new mongoose.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              phone: req.body.phone,
              city: req.body.city,
              invitationCode: req.body.invitationCode,
            });
            driver
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Driver created",
                  data: result,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  driverModel
    .find({ email: req.body.email })
    .exec()
    .then((driver) => {
      if (driver.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, driver[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: driver[0].email,
              driverID: driver[0]._id,
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
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/getNewandBanUser", function (req, res, next) {
  driverModel
    .find({ flagBan: 0 })
    .select()
    .exec()
    .then((responce) => {
      responce = JSON.parse(JSON.stringify(responce));
      let x = 1;
      responce.forEach((element) => {
        element.id = x;
        x++;
      });
      res.send({
        message: "Get driver Data is",
        data: responce,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/getInTable", function (req, res, next) {
  driverModel
    .find({ flagBan: 1 }) //means enabled driver show in table
    .select()
    .exec()
    .then((responce) => {
      responce = JSON.parse(JSON.stringify(responce));
      let x = 1;
      responce.forEach((element) => {
        element.id = x;
        x++;
      });
      res.send({
        message: "Get driver Data is",
        data: responce,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/getBanInTable", function (req, res, next) {
  driverModel
    .find({ flagBan: 2 }) //means enabled driver show in table
    .select()
    .exec()
    .then((responce) => {
      responce = JSON.parse(JSON.stringify(responce));
      let x = 1;
      responce.forEach((element) => {
        element.id = x;
        x++;
      });
      res.send({
        message: "Get driver Data is",
        data: responce,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/getDataforHeader", function (req, res, next) {
  driverModel
    .find()
    .exec()
    .then((responce) => {
      res.send({
        message: "Get Data Data is",
        data: responce.length,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//Flag enable driver update
router.put("/updateflagEnable", function (req, res, next) {
  const ID = req.body.ID;

  driverModel.findByIdAndUpdate(
    ID,
    { flagBan: "1" }, //means enabled updated by admin

    function (err, response) {
      if (err) {
        console.log("You have Error in flagBan Update Api", err);
        res.send(err);
      } else {
        res.send({
          message: "FlagBan is updated",
          data: response,
        });
      }
    }
  );
});

//Flag ban driver update
router.put("/updateflagBan", function (req, res, next) {
  const ID = req.body.ID;

  driverModel.findByIdAndUpdate(
    ID,
    { flagBan: "2" }, //means enabled updated by admin

    function (err, response) {
      if (err) {
        console.log("You have Error in flagBan Update Api", err);
        res.send(err);
      } else {
        res.send({
          message: "FlagBan is updated",
          data: response,
        });
      }
    }
  );
});



//Flag ban driver update
router.put("/updateflagBan", function (req, res, next) {
  const ID = req.body.ID;

  driverModel.findByIdAndUpdate(
    ID,
    { flagBan: 2 }, // means banned by admin

    function (err, response) {
      if (err) {
        console.log("You have Error in flagBan Update Api", err);
        res.send(err);
      } else {
        res.send({
          message: "FlagBan is updated",
          data: response,
        });
      }
    }
  );
});

router.delete("/driverID", (req, res, next) => {
  driverModel
    .remove({ _id: req.params.driverID })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Driver deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/update", function (req, res, next) {
  const id = req.body.id;
  // const imageOfDriver = req.body.imageOfDriver;
  // const licenseOfDriver = req.body.licenseOfDriver;
  // const documentOfCar = req.body.documentOfCar;

  console.log("ID is ", id);
  driverModel.findByIdAndUpdate(
    id,
    {
      imageOfDriver: req.body.imageOfDriver,

      licenseOfDriver: req.body.licenseOfDriver,
      licenseOfDriverBack: req.body.licenseOfDriver,

      documentOfCar: req.body.documentOfCar,
      documentOfCarBack: req.body.documentOfCar,

      NICofDriver: req.body.imageOfDriver,
      NICofDriverBack: req.body.imageOfDriver,
    },

    function (err, response) {
      if (err) {
        console.log("You have Error in Update driver images Api", err);
        res.send(err);
      } else {
        res.send({
          message: "driver images data is update",
          data: response,
        });
      }
    }
  );
});

//

router.put("/postmany", upload.array("photos", 7), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  // console.log("Req File is ", req.file);
  const id = req.body.id;

  console.log("ID is ", id);

  console.log("Files are ", req.files);
  res.send("Keen");

  // driverModel.findByIdAndUpdate(
  //   id,
  //   {
  //     imageOfDriver: req.files[0].path,

  //     licenseOfDriver: req.files[1].path,
  //     licenseOfDriverBack: req.files[2].path,

  //     documentOfCar: req.files[3].path,
  //     documentOfCarBack: req.files[4].path,

  //     NICofDriver: req.files[5].path,
  //     NICofDriverBack: req.files[6].path,
  //   },

  //   function (err, response) {
  //     if (err) {
  //       console.log("You have Error in Update driver images Api", err);
  //       res.send(err);
  //     } else {
  //       res.send({
  //         message: "driver images data is update",
  //         data: response,
  //       });
  //     }
  //   }
  // );
});

////

module.exports = router;
