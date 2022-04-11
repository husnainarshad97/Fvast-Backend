const mongoose = require("mongoose");

var tripSchema = mongoose.Schema({
  driverID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "driverTable",
  },

  passengerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "passengerTable",
  },

  travelFrom: {
    type: String,
    required: true,
  },
  travelTo: {
    type: String,
    required: true,
  },
  tripType: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    // required: true,
  },
  currentTime: {
    type: String,
    required: true,
  },
  timeTraveled: {
    type: Number,
    required: true,
  },
  distanceTraveled: {
    type: Number,
    required: true,
  },
  finalFare: {
    type: Number,
    required: true,
  },
  
  // comissionOfAdmin: {
  //   type: Number,
  //   required: true,
  // },
});

var tripModel = mongoose.model("tripTable", tripSchema);

module.exports = tripModel;
