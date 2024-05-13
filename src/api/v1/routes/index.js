const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const discoverRouter = require("./discover");

router.use("/auth", authRouter);
router.use("/discover", discoverRouter);

module.exports = router;
