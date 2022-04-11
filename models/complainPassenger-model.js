const mongoose = require("mongoose");

var complainPassengerSchema = mongoose.Schema({
  passengerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "passengerTable",
  },

  complain: {
    type: String,
    required: true,
  },
});

var complainPassengerModel = mongoose.model(
  "complainPassengerTable",
  complainPassengerSchema
);

module.exports = complainPassengerModel;
