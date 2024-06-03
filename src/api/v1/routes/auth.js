const express = require("express");
const router = express.Router();
const upload = require("../uploadConfig/index");

//Validation

//Controller
const authController = require("../controllers/auth/authController");
//auth

router.get("/getAccount", authController.getAllAccount);
router.get("/getAccount/:refId", authController.getAccount);
router.get("/getAccountById/:id", authController.getAccountById);
router.get("/getToken", authController.authenticateToken); //Get Access Token
router.post("/refreshToken", authController.refreshToken); //Create New Access Token
router.post("/registerAccount", authController.registerAccount);
router.post("/loginAccount", authController.loginAccount);
router.delete("/logoutAccount", authController.logoutAccount);
router.patch(
  "/editAccount/:id",
  upload.single("imgs"),
  authController.editAccount
); //Edit Account
router.get("/findUser/:refId", authController.findUser); //Get username
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);
router.delete("/deleteAccount/:id", authController.deleteAccount);

module.exports = router;
