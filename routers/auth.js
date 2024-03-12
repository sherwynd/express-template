const express = require("express");
const router = express.Router();

//Controller
const authController = require("../controllers/auth");
//auth/

router.get("/getAccount", authController.getAllAccount); //Get All
router.get("/getToken", authController.authenticateToken); //Get Token To Check Expiration
router.post("/refreshToken", authController.refreshToken); //Create New Token (If Old Token Expired)
router.post("/registerAccount", authController.registerAccount); //Register Account
router.post("/loginAccount", authController.loginAccount); //Login Account
router.delete("/deleteAccount/:id", authController.deleteAccount); //Delete Account
router.delete("/logoutAccount", authController.logoutAccount); //Log Out Account
router.patch("/editAccount/:id", authController.editAccount); //Edit Account
router.post("/forgotPassword", authController.forgotPassword); //Forgot Password Account
// router.post("/forgotPassword/:id", authController.forgotPassword); //Forgot Password Account

module.exports = router;
