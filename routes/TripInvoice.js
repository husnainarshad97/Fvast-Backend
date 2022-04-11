const express = require("express");
const router = express.Router();
const vehicleTypeModel = require("../models/vehicleType-model");
const tripModel = require("../models/trip-model");
const comissionModel = require("../models/setComission-model");
const totalComissionModel = require("../models/totalComissionToAdmin-model");

//calculate fare api
router.post("/calculateFinalFare", function (req, res, next) {
  //sedan_ID just to check because fahad will give id of selected doc
  const id = req.body.id;
  // const id = "613f4d4cfe33554b4078914e";
  vehicleTypeModel
    .findById(id)
    // .select("BaseFare PricePerKm PricePerMin")
    .exec()
    .then((result) => {
      // now calculate final fare
      let baseFare = result.baseFare;
      let priceKm = result.pricePerKm;
      let priceTime = result.pricePerMin; // per minute
      let totalDistance = req.body.distanceTraveled; // in KM
      let totalTime = req.body.timeTraveled; // In Mins
      var fare = baseFare + priceKm * totalDistance + priceTime * totalTime;
      // final fare till here "Fare is in var fare"

      // now get commision % from DB
      comissionModel
        .findOne()
        .exec()
        .then((comission) => {
          // console.log("Comission table ", comission.comissionOnRide);
          let paymentType = req.body.paymentType; // cash or card

          let RideComission = comission.comissionOnRide;
          var comissionPayable = (fare * RideComission) / 100; //by driver

          var RideComissionOfDriver = 100 - RideComission; //comission of driver 75%
          var comissionPayableByAdmin = (fare * RideComissionOfDriver) / 100; //by admin weekly

          // Now search if Driver Exixts in total comission table
          totalComissionModel
            .findOne({ driverID: req.body.driverID })
            .exec()
            .then((driver) => {
              if (paymentType === "cash") {
                // console.log("Drivers are ", driver);
                if (!driver) {
                  // no driver exists
                  // console.log("Make new Driver");
                  let newTotalComission = new totalComissionModel({
                    comissionPayable: comissionPayable,
                    driverID: req.body.driverID,
                  });
                  newTotalComission.save(function (err, result) {
                    if (err) {
                      console.log("Error in Add new comission Table", err);
                    }
                  });
                } else {
                  // console.log("Driver found Update it");
                  let newcomission = driver.comissionPayable + comissionPayable;
                  if (newcomission >= 5000) {
                    driverModel.findByIdAndUpdate(
                      req.body.driverID,
                      { flagBan: 2 },
                      function (err, result) {
                        if (err) {
                          console.log("Error in Add new comission Table", err);
                        }
                      }
                    );
                  }
                  // let totalComissionID =  driver._id
                  //  waring generated here
                  totalComissionModel.findByIdAndUpdate(
                    driver._id,
                    {
                      comissionPayable: newcomission,
                    },
                    function (err, result) {
                      if (err) {
                        console.log("Error in Add new comission Table", err);
                      }
                    }
                  );
                }
              } else {
                // console.log("Drivers are ", driver);
                if (!driver) {
                  // no driver exists
                  // console.log("Make new Driver");
                  let newTotalComission = new totalComissionModel({
                    comissionPayableByAdmin: comissionPayableByAdmin,
                    driverID: req.body.driverID,
                  });
                  newTotalComission.save(function (err, result) {
                    if (err) {
                      console.log("Error in Add new commison Table", err);
                    }
                  });
                } else {
                  // console.log("Driver found Update it");
                  let newcomission =
                    driver.comissionPayableByAdmin + comissionPayableByAdmin;
                  // let totalComissionID =  driver._id
                  //  waring generated here
                  totalComissionModel.findByIdAndUpdate(
                    driver._id,
                    {
                      comissionPayableByAdmin: newcomission,
                    },
                    function (err, result) {
                      if (err) {
                        console.log("Error in Add new commison Table", err);
                      }
                    }
                  );
                }
              }
            });
        })
        .finally(() => {
          // Save trip here
          let newtrip = new tripModel({
            driverID: req.body.driverID,
            passengerID: req.body.passengerID,
            travelFrom: req.body.travelFrom,
            travelTo: req.body.travelTo,
            tripType: req.body.tripType,
            currentTime: req.body.currentTime,
            timeTraveled: req.body.timeTraveled,
            distanceTraveled: req.body.distanceTraveled,
            finalFare: fare,
          });
          newtrip.save(function (err, result) {
            if (err) {
              console.log("Error in Add new Trip in Table", err);
            } else {
              res.send({
                message: "Trip added",
                totalFare: fare,
              });
            }
          });
        });
    })
    .catch((err) => {
      console.log("Error in Calculating fare and is", err);
      res.send(err);
    });
});

router.post("/PostTotalCommisionModel", function (req, res, next) {
  let id = "614055ff9e403c1098530daa";
  let newtotal = totalComissionModel({
    comissionPayable: 10,
    comissionPayableByAdmin: 10,
    driverID: id,
  });
  newtotal
    .save()
    .then((responce) => {
      console.log("Data Saved Check it new Method used");
      res.send({
        message: "totalComissionAdded",
        data: responce,
      });
    })
    .catch((err) => {
      console.log("Error in Adding data in totalComission Table", err);
      res.send(err);
    });
});

router.post("/CancelledRides", function (req, res, next) {
  // let id = "614055ff9e403c1098530daa";
  let id = req.body.id;
  let rideIs = req.body.rideIs;

  let newtotal = tripModel({
    rideIs: false, // is ride cancelled
    // comissionPayableByAdmin: 10,
    passengerID: req.body.passengerID,
    driverID: req.body.driverID,
    finalFare,
    travelTo,
    travelFrom,
  });
  newtotal
    .save()
    .then((responce) => {
      console.log("Data Saved Check it new Method used");
      res.send({
        message: "totalComissionAdded",
        data: responce,
      });
    })
    .catch((err) => {
      console.log("Error in Adding data in totalComission Table", err);
      res.send(err);
    });
});

//trip invioce
// router.get("/getInTable", function (req, res, next) {
//   tripModel.find(function (err, response) {
//     if (err) {
//       console.log("You have Error in gat trip invoice data api", err);
//       res.send(err);
//     } else {
//       response = JSON.parse(JSON.stringify(response));
//       let x = 1;
//       response.forEach((element) => {
//         element.id = x;
//         x++;
//       });
//       res.send({
//         message: "Here is trip invoicedata",
//         data: response,
//       });
//       // res.send(response);
//     }
//   });
// });

router.get("/getInTable", function (req, res, next) {
  tripModel
    .find()
    // .select("")
    .populate("driverID passengerID")
    .exec()
    .then((responce) => {
      responce = JSON.parse(JSON.stringify(responce));
      let x = 1;
      responce.forEach((element) => {
        element.id = x;
        x++;
        element.passengerName =
          element.passengerID.firstName + " " + element.passengerID.lastName ||
          "";
        delete element.passengerID;

        element.driverName =
          element.driverID.firstName + " " + element.driverID.lastName || "";

        delete element.driverID;
      });
      res.send({
        message: "Get complain Data is",
        data: responce,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/getComissiondata", function (req, res, next) {
  totalComissionModel.find(function (err, response) {
    if (err) {
      console.log("You have Error in get total cimission data api", err);
      res.send(err);
    } else {
      response = JSON.parse(JSON.stringify(response));
      let x = 1;
      response.forEach((element) => {
        element.id = x;
        x++;
      });
      res.send({
        message: "Here is trip comission data",
        data: response,
      });
    }
  });
});

// //Fare calculation formula values update
// router.put("/update", function (req, res, next) {
//   const baseFare = req.body.baseFare;
//   const pricePerKm = req.body.pricePerKm;
//   const pricePerMin = req.body.pricePerMin;
//   const id = "6107cc664559d304e09f6f6f";

//   vehicleManagementModel.findByIdAndUpdate(
//     id,
//     { baseFare: baseFare, pricePerKm: pricePerKm, pricePerMin: pricePerMin },

//     function (err, response) {
//       if (err) {
//         console.log("You have Error in Fare Calculation Update Api", err);
//         res.send(err);
//       } else {
//         res.send({
//           message: "Fare Calculation data is update",
//           data: response,
//         });
//       }
//     }
//   );
// });

// //delete Fare
// router.delete("/fareDelete", function (req, res, next) {
//   var { id } = req.query;
//   vehicleTypeModel.findByIdAndDelete(id, function (err, response) {
//     if (err) {
//       console.log("You have Error in delete Fare api in Fare page", err);
//       res.send(err);
//     } else {
//       res.send({
//         message: "Fare  is deleted",
//         data: response,
//       });
//     }
//   });
// });

module.exports = router;
