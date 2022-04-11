var express = require("express");
var router = express.Router();
const currencyModel = require("../models/currency-model");

//add currency
router.post("/addcurrency", function (req, res, next) {
  var currency = req.body.currency;
  let newcurrency = new currencyModel({
    currency: currency,
  });

  console.log(newcurrency);

  newcurrency.save(function (err, responce) {
    if (err) {
      console.log("Error in Add Currency", err);
      res.send(err);
    } else {
      res.send({
        message: "Currency Added",
        data: responce,
      });
    }
  });
});

//get currency add
router.get("/currencyadded", function (req, res, next) {
  currencyModel
    .find({ flagBan: false })
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
        message: "Get Currency selected Data is",
        data: responce,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//get currency selected
router.get("/currencyselected", function (req, res, next) {
  currencyModel
    .find({ flagBan: true })
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
        message: "Get Currency selected Data is",
        data: responce,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//Flag enable driver update
router.put("/updateflagEnable", function (req, res, next) {
  const ID = req.body.id;

  currencyModel
    .findByIdAndUpdate(req.body.selectedId, { flagBan: false })
    .then(() => {
      currencyModel.findByIdAndUpdate(
        ID,
        { flagBan: true },
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
    })
    .catch((err) => {
      console.log("Error in Upldated the flag API and error is ", err);
      res.send(err);
    });

  // currencyModel.findByIdAndUpdate(
  //   ID,
  //   { flagBan: true },

  //   // currencyModel.findByIdAndUpdate(
  //   //   ID,
  //   //   { flagBan: false },

  //   function (err, response) {
  //     if (err) {
  //       console.log("You have Error in flagBan Update Api", err);
  //       res.send(err);
  //     } else {
  //       res.send({
  //         message: "FlagBan is updated",
  //         data: response,
  //       });
  //     }
  //   }
  // );
});

//Flag ban driver update
router.put("/updateflagBan", function (req, res, next) {
  const ID = req.body.id;

  currencyModel.findByIdAndUpdate(
    ID,
    { flagBan: false },

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

//delete currency
router.delete("/currencyDelete", function (req, res, next) {
  var { id } = req.query;
  currencyModel.findByIdAndDelete(id, function (err, response) {
    if (err) {
      console.log("You have Error in delete Currency api in zain page", err);
      res.send(err);
    } else {
      res.send({
        message: "Currency  is deleted",
        data: response,
      });
    }
  });
});

module.exports = router;
