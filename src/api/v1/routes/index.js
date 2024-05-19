const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const eventRouter = require("./event");

router.use("/auth", authRouter);
router.use("/event", eventRouter);

module.exports = router;
