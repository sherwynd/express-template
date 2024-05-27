const errorHandler = require("./utils/errorHandler");
const express = require("express");
const cors = require("cors");

const router = require("./api/v1/routes");

const app = express();

//middlewares
app.use(function (req, res, next) {
  next();
});
app.use("/uploads", express.static("src/api/v1/uploads"));

//configs
require("module-alias/register");

//routes
app.use(express.json());
app.use(cors());
app.use("/", router);

// swaggerDocs(app, port);

//handle errors
app.use(errorHandler);

module.exports = app;
