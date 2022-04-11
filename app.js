var express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({ origin: true }));

var createCheckoutSession = require("./api/checkout");

var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var con = require("./config/config");
var complainDriverRouter = require("./routes/complainDriver");
var complainPassengerRouter = require("./routes/complainPassenger");
var currencyRouter = require("./routes/currency");
var driverRouter = require("./routes/driver");
var editProfileRouter = require("./routes/EditProfile");
var indexRouter = require("./routes/index");
var imageRouter = require("./routes/Image");
var FirebasePushNotificationsRouter = require("./routes/FirebasePushNotifications");
var setComissionRouter = require("./routes/SetComission");
var tripInvoiceRouter = require("./routes/tripInvoice");
var passengerRouter = require("./routes/passenger");
var vehicleTypeManagementRouter = require("./routes/vehicleTypeManagement");
var ninedotsRouter = require("./routes/Ninedots");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use("/", indexRouter);
app.use("/complainDriver", complainDriverRouter);
app.use("/complainPassenger", complainPassengerRouter);
app.use("/currency", currencyRouter);
app.use("/driver", driverRouter);
app.use("/editProfile", editProfileRouter);
app.use("/image", imageRouter);
app.use("/FirebasePushNotifications", FirebasePushNotificationsRouter);
app.use("/setcomission", setComissionRouter);
app.use("/tripInvoice", tripInvoiceRouter);
app.use("/passenger", passengerRouter);
app.use("/vehicleManagement", vehicleTypeManagementRouter);
app.use("/ninedots", ninedotsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.post("/create-checkout-session", createCheckoutSession);

app.listen(port, () => console.log("   LISTENING AT", port));

module.exports = app;
