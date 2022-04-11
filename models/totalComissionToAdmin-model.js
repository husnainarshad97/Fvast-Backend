const mongoose = require("mongoose");

var totalComissionofAdmin = mongoose.Schema({
  
  comissionPayable: {
    type: Number,
    // required: true,
   },

   comissionPayableByAdmin: {
    type: Number,
    // required: true,
   },

  driverID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "driverTable",
  },



});

var totalComissionofAdminModel = mongoose.model("totalComissionofAdminTable", totalComissionofAdmin);

module.exports = totalComissionofAdminModel;
