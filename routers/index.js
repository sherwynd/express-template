const express = require('express')
const router = express.Router();

const templateRouter = require('./template')
const userRouter = require('./user')

router.use('/template', templateRouter)
router.use('/user', userRouter)

module.exports = router