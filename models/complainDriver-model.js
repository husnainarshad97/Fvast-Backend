const mongoose = require("mongoose");

var complainDriverSchema = mongoose.Schema({
  driverID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "driverTable",
  },

  complain: {
    type: String,
    required: true,
  },
});

var complainDriverModel = mongoose.model(
  "complainDriverTable",
  complainDriverSchema
);

module.exports = complainDriverModel;
