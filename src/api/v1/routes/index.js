const express = require("express");
const router = express.Router();

const templateRouter = require("./template");
const authRouter = require("./auth");

router.use("/template", templateRouter);
router.use("/auth", authRouter);

module.exports = router;
