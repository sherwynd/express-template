const express = require("express");
const router = express.Router();

//Controller
const templateController = require("../controllers/template");
//template/

router.get("/", templateController.getAllTemplate); //Get ALL
router.get("/:id", templateController.getIdTemplate); //Get ids
router.post("/", templateController.createTemplate); //Create
router.patch("/:id", templateController.updateTemplate); //Patch
router.delete("/:id", templateController.deleteTemplate); //Delete

module.exports = router;
