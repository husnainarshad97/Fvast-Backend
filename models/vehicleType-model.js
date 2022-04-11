const mongoose = require("mongoose");

var vehicleTypeSchema = mongoose.Schema({
  vehicleType: {
    type: String,
    required: true,
  },

  baseFare: {
    type: Number,
    required: true,
    default: 0,
  },

  pricePerKm: {
    type: Number,
    required: true,
    default: 0,
  },

  pricePerMin: {
    type: Number,
    required: true,
    default: 0,
  },
});

var vehicleTypeModel = mongoose.model("vehicleTypeTable", vehicleTypeSchema);

module.exports = vehicleTypeModel;
