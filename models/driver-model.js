const mongoose = require("mongoose");

var driverSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  invitationCode: {
    type: String,
    default: "No invitation code",
  },
  //images
  imageOfDriver: {
    type: String,
    required: true,
    default: "Driver Image to be Uploaded",
  },

  licenseOfDriver: {
    type: String,
    required: true,
    default: "Driver License Image to be Uploaded",
  },
  licenseOfDriverBack: {
    type: String,
    required: true,
    default: "Driver License Image to be Uploaded",
  },

  documentOfVehicle: {
    type: String,
    required: true,
    default: "Vehcle Doc Image to be Uploaded",
  },
  documentOfVehicleBack: {
    type: String,
    required: true,
    default: "Vehcle Doc Image to be Uploaded",
  },

  NICofDriver: {
    type: String,
    required: true,
    default: "Driver Image to be Uploaded",
  },

  NICofDriverBack: {
    type: String,
    required: true,
    default: "Driver Image to be Uploaded",
  },

  //flag
  flagBan: {
    type: Number,
    required: true,
    default: "0",
  },
});

var driverModel = mongoose.model("driverTable", driverSchema);

module.exports = driverModel;
// module.exports = mongoose.model("driverTable", driverSchema);
