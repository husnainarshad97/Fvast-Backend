const mongoose = require("mongoose");

var adminProfileSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  aboutme: {
    type: String,
    required: true,
  },
});

var adminProfileModel = mongoose.model("adminProfileTable", adminProfileSchema);

module.exports = adminProfileModel;
