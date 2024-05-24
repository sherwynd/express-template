const express = require("express");
const router = express.Router();

const authRouter = require("./auth");

router.use("/auth", authRouter);
router.use("/invoice", require("../routes/productInvoice"));
router.use("/address", require("../routes/addressRoutes"));

module.exports = router;
