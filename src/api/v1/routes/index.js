const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const eventRouter = require("./event");
const discoverRouter = require("./discover");

router.use("/auth", authRouter);
router.use("/event", eventRouter);
router.use("/discover", discoverRouter);
router.use("/invoice", require("../routes/productInvoice"));
router.use("/address", require("../routes/addressRoutes"));


module.exports = router;
