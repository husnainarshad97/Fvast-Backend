const mongoose = require("mongoose");

var currencySchema = mongoose.Schema({
  currency: {
    type: String,
    required: true,
  },

   //flag
   flagBan:{
    type:Boolean,
    required: true,
    default: "false",
  }
});

var currencyModel = mongoose.model("currencyTable", currencySchema);

module.exports = currencyModel;
