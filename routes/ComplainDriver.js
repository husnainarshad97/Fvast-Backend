var express = require("express");
var router = express.Router();
const complainDriverModel = require("../models/complainDriver-model");

//add in complain

router.post("/addComplainDriver", function (req, res, next) {
  var driverID = req.body.driverID;
  var complain = req.body.complain;

  let newcomplainDriver = new complainDriverModel({
    driverID: driverID,
    complain: complain,
  });

  console.log(newcomplainDriver);

  newcomplainDriver.save(function (err, response) {
    if (err) {
      console.log("Error in Add complainDriver", err);
      res.send(err);
    } else {
      res.send(response);

      // res.send({
      //   message: "complainDriver Added",
      //   data: responce,
      // });
    }
  });
});

//complain get

router.get("/getInTable", function (req, res, next) {
  complainDriverModel
    .find()
    .select("_id complain email firstName driverID ")
    .populate("driverID", "firstName + lastName + phone + email")
    .exec()
    .then((responce) => {
      responce = JSON.parse(JSON.stringify(responce));
      let x = 1;
      responce.forEach((element) => {
        element.id = x;
        x++;

        element.name =
        element.driverID.firstName + " " + element.driverID.lastName || "";
        element.email = element.driverID.email || "";
        element.phone = element.driverID.phone || "";

        delete element.driverID;
      });
      res.send({
        message: "Get driver complain Data is",
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
  complainDriverModel.findByIdAndDelete(id, function (err, response) {
    if (err) {
      console.log(
        "You have Error in delete complain api in driver comlain page",
        err
      );
      res.send(err);
    } else {
      res.send({
        message: "complain driver is deleted",
        data: response,
      });
    }
  });
});

module.exports = router;
