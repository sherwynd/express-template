const express = require('express')
const router = express.Router()

//Controller
const authController = require('../controllers/auth')
//auth/

router.get('/', authController.getAllAccount)//Get ALL
// router.get('/:id', authController.getIdAccount) //Get ids
router.post('/registerAccount', authController.registerAccount) //Create
router.post('/loginAccount', authController.loginAccount) //Create
router.delete('/deleteAccount/:id', authController.deleteAccount) //Delete
router.patch('/editAccount/:id', authController.editAccount) //Patch


module.exports = router