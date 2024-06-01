const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const eventRouter = require("./event");
const discoverRouter = require("./discover");
const invoice = require("../routes/productInvoice");
const address = require("../routes/addressRoutes");
const rating = require("../routes/rating");

router.use("/auth", authRouter);
router.use("/event", eventRouter);
router.use("/discover", discoverRouter);
router.use("/invoice", invoice);
router.use("/address", address);
router.use("/rating", rating);
router.use("/blogs", require("../routes/blog"));

module.exports = router;
