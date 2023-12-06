require('dotenv').config()

const swaggerSetup = require('./utils/swagger');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')

mongoose.connect('mongodb://127.0.0.1:27017/template',{ useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const router = require('./routers')
app.use('/', router)
app.use(flash())

app.listen(3000, () => console.log('Server has started'))