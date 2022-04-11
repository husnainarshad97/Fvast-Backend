const mongoose = require("mongoose");

var firebasePushNotificationSchema = mongoose.Schema({
  apiKey: {
    type: String,
    required: true,
  },
  authDomain: {
    type: String,
    required: true,
  },
  databaseURL: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  storageBucket: {
    type: String,
    required: true,
  },
  messagingSenderId: {
    type: String,
    required: true,
  },
  appId: {
    type: String,
    required: true,
  },
});

var firebasePushNotificationModel = mongoose.model(
  "firebasePushNotificationTable",
  firebasePushNotificationSchema
);

module.exports = firebasePushNotificationModel;
