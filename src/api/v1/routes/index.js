const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const eventRouter = require("./event");
const discoverRouter = require("./discover");

router.use("/auth", authRouter);
router.use("/event", eventRouter);
router.use("/discover", discoverRouter);

module.exports = router;
