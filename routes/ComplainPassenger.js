var express = require("express");
var router = express.Router();
const complainPassengerModel = require("../models/complainPassenger-model");

//add in complain

router.post("/addComplainPassenger", function (req, res, next) {
  var passengerID = req.body.passengerID;
  var complain = req.body.complain;

  let newcomplainPassenger = new complainPassengerModel({
    passengerID: passengerID,
    complain: complain,
  });

  console.log(newcomplainPassenger);

  newcomplainPassenger.save(function (err, response) {
    if (err) {
      console.log("Error in Add complainPassenger", err);
      res.send(err);
    } else {
      res.send(response);

      // res.send({
      //   message: "complainPassenger Added",
      //   data: responce,
      // });
    }
  });
});

//complain get

router.get("/getInTable", function (req, res, next) {
  complainPassengerModel
    .find()
    .select("_id complain email firstName passengerID")
    .populate("passengerID", "firstName + lastName + phone + email")
    .exec()
    .then((responce) => {
      responce = JSON.parse(JSON.stringify(responce));
      let x = 1;
      responce.forEach((element) => {
        element.id = x;
        x++;
        element.name =
          element.passengerID.firstName + " " + element.passengerID.lastName ||
          "";
        element.email = element.passengerID.email || "";
        element.phone = element.passengerID.phone || "";

        delete element.passengerID;
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

//delete complain
router.delete("/complainDelete", function (req, res, next) {
  var { id } = req.query;
  complainPassengerModel.findByIdAndDelete(id, function (err, response) {
    if (err) {
      console.log("You have Error in delete complainPassenger api ", err);
      res.send(err);
    } else {
      res.send({
        message: "complainPassenger  is deleted",
        data: response,
      });
    }
  });
});

module.exports = router;
