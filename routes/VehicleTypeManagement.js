const express = require("express");
const router = express.Router();
const vehicleTypeModel = require("../models/vehicleType-model");

router.post("/saveVehicleType", function (req, res, next) {
  let newvehicleType = new vehicleTypeModel({
    vehicleType: req.body.vehicleType,
    // baseFare: req.body.baseFare,
    // pricePerKm: req.body.pricePerKm,
    // pricePerMin: req.body.pricePerMin,
  });

  console.log(newvehicleType);

  newvehicleType.save(function (err, responce) {
    if (err) {
      console.log("Error in Add VehicleType", err);
      res.send(err);
    } else {
      res.send({
        message: "VehicleType Added",
        data: responce,
      });
    }
  });
});

//get specific data
router.get("/getdata", function (req, res, next) {
  vehicleTypeModel.find(function (err, response) {
    if (err) {
      console.log("You have Error in Fare data api", err);
      res.send(err);
    } else {
      res.send({
        message: "Here is All vehicles types and fare base etc",
        data: response,
      });
      // res.send(response);
    }
  });
});

//Fare calculation formula values update
router.put("/update", function (req, res, next) {
  const vehicleType = req.body.vehicleType;
  const baseFare = req.body.baseFare;
  const pricePerKm = req.body.pricePerKm;
  const pricePerMin = req.body.pricePerMin;
  const ID = req.body.ID;
  console.log("ID is ", ID);
  vehicleTypeModel.findByIdAndUpdate(
    ID,
    {
      vehicleType: vehicleType,
      baseFare: baseFare,
      pricePerKm: pricePerKm,
      pricePerMin: pricePerMin,
    },

    function (err, response) {
      if (err) {
        console.log("You have Error in Fare Calculation Update Api", err);
        res.send(err);
      } else {
        res.send({
          message: "Fare Calculation data is update",
          data: response,
        });
      }
    }
  );
});

//delete Fare
router.delete("/deleteVehicle", function (req, res, next) {
  var { id } = req.query;
  vehicleTypeModel.findByIdAndDelete(id, function (err, response) {
    if (err) {
      console.log("You have Error in delete Vehicle api in Vehicle page", err);
      res.send(err);
    } else {
      res.send({
        message: "Vehicle  is deleted",
        data: response,
      });
    }
  });
});

module.exports = router;
