const mongoose = require("mongoose");

var driverSchema = mongoose.Schema({
  headerr: {
    type: String,
    required: false,
    default: "Some Text here",
  },
  footer: {
    type: String,
    required: false,
    default: "Some Text here",
  },

  heading1Name: {
    type: String,
    required: false,
    default: "Some Text here",
  },

  heading2Name: {
    type: String,
    required: false,
    default: "Some Text here",
  },

  subHeadingName: {
    type: Number,
    required: false,
    default: "Some Text here",
  },

  text: {
    type: String,
    required: false,
    default: "Some Text here",

  },

  imageOfPage1: {
    type: String,
    default: "Image to be Uploaded",
  },
  //images
  imageOfPage2i: {
    type: String,
    required: false,
    default: "Image to be Uploaded",
  },

  imageOfPage2ii: {
    type: String,
    required: false,
    default: " Image to be Uploaded",
  },
  imageOfPage2iii: {
    type: String,
    required: false,
    default: " Image to be Uploaded",
  },

  imageOfPage2iv: {
    type: String,
    required: false,
    default: "Image to be Uploaded",
  }
});

var driverModel = mongoose.model("driverTable", driverSchema);

module.exports = driverModel;
// module.exports = mongoose.model("driverTable", driverSchema);
