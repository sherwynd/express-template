const express = require('express')
const router = express.Router()

//Controller
const authController = require('../controllers/auth')
//auth/

router.get('/', authController.getAllAccount)//Get ALL
router.get('/getToken', authController.authenticateToken) //Get ids
router.post('/refreshToken', authController.refreshToken) //Create
router.post('/registerAccount', authController.registerAccount) //Create
router.post('/loginAccount', authController.loginAccount) //Create
router.delete('/deleteAccount/:id', authController.deleteAccount) //Delete
router.delete('/logoutAccount', authController.logoutAccount) //Delete
router.patch('/editAccount/:id', authController.editAccount) //Patch


module.exports = router