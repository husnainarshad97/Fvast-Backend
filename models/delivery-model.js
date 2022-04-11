const mongoose = require("mongoose");

var deliverySchema = mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "driverTable",
  },

  firstName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "passengerTable",
  },

  travelFrom: {
    type: Number,
    required: true,
  },
  travelTo: {
    type: Number,
    required: true,
  },
  tripType: {
    type: String,
    required: true,
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
});

var deliveryModel = mongoose.model("deliveryTable", deliverySchema);

module.exports = deliveryModel;
