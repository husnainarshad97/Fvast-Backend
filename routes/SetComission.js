var express = require("express");
var router = express.Router();
const setComissionModel = require("../models/setComission-model");

//add currency
router.post("/setComission", function (req, res, next) {
  let setComissionobj = new setComissionModel({
    comissionOnRide: req.body.comissionOnRide,
  });
  setComissionobj.save(function (err, responce) {
    if (err) {
      console.log("Error in Add comission", err);
      res.send(err);
    } else {
      res.send({
        message: "Comission Added",
        data: responce,
      });
    }
  });
});

router.put("/update", function (req, res, next) {
  const id = "6141a8a8ccfd796a4069ae55";
  setComissionModel.findByIdAndUpdate(
    id,
    {
      comissionOnRide: req.body.comissionOnRide,
    },

    function (err, response) {
      if (err) {
        console.log("You have Error in set comission Api", err);
        res.send(err);
      } else {
        res.send({
          message: "comission is updated",
          data: response,
        });
      }
    }
  );
});

//Comission get
router.get("/getInTable", function (req, res, next) {
  setComissionModel.find(function (err, response) {
    if (err) {
      console.log("You have Error in set comission data api", err);
      res.send(err);
    } else {
      response = JSON.parse(JSON.stringify(response));
      res.send({
        message: "Here is set comission data",
        data: response,
      });
    }
  });
});

module.exports = router;
