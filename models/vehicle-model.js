const mongoose = require("mongoose");

var vehicleSchema = mongoose.Schema({
  firstName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "driversTable",
  },

  vehicleType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "VehicleTypeTable",
  },

  vehicleName: {
    type: String,
    required: true,
  },

  vehicleNumber: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
});

var vehicleModel = mongoose.model("vehicleTable", vehicleSchema);

module.exports = vehicleModel;
