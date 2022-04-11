const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var driverModel = require("../models/driver-model");

const multer = require("multer");
// var fs = require("fs"); // file system

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

router.put("/postmany", upload.array("photos", 7), function (req, res, next) {
  const id = req.body.id;

  console.log("Req files are ", req.files[0].path);

  console.log("ID is ", id);
  // res.send(req.files[0].path);
  driverModel
    .findByIdAndUpdate(id, {
      imageOfDriver: req.files[0].path,

      licenseOfDriver: req.files[1].path,
      licenseOfDriverBack: req.files[2].path,

      documentOfVehicle: req.files[3].path,
      documentOfVehicleBack: req.files[4].path,

      NICofDriver: req.files[5].path,
      NICofDriverBack: req.files[6].path,
    })
    .exec()
    .then((response) => {
      res.send({
        message: "ImageUpdated",
        data: response,
      });
    })
    .catch((err) => {
      console.log("Error in Update Image Path and error is ", err);
      res.send(err);
    });
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

//upload one image
// router.post("/post", upload.single("imageOfdriver"), function (req, res, next) {
//   // console.log("Req File is ", req.file);

//   const objdriverModel = new driverModel({
//     imageOfDriver: req.file.path,
//   });

//   objdriverModel
//     .save()
//     .then((result) => {
//       // console.log("Image saving result is ", result);
//       res.send({
//         message: "Created image successfully",
//         data: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send({
//         message: "ErrorInSavingImage",
//         error: err,
//       });
//     });
// });

// router.get("/get", (req, res, next) => {
//   driverModel
//     .find()
//     .select("_id imageOfDriver")
//     .exec()
//     .then((docs) => {
//       const response = {
//         count: docs.length,
//         objdriverModel: docs.map((doc) => {
//           return {
//             imageOfDriver: doc.imageOfDriver,
//             _id: doc._id,
//             request: {
//               type: "GET",
//               url: "http://localhost:/uploads/" + doc._id,
//             },
//           };
//         }),
//       };
//       res.status(200).json(response);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

module.exports = router;
