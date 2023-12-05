require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/template',{ useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const router = require('./routers')
app.use('/', router)

app.listen(3000, () => console.log('Server has started'))