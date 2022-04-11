const mongoose = require("mongoose");

var setComissionSchema = mongoose.Schema({
  
  comissionOnRide: {
    type: Number,
    required: true,
    // default: 0,
  },


});

var setComissionModel = mongoose.model("setComissionTable", setComissionSchema);

module.exports = setComissionModel;
