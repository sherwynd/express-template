const mongoose = require('mongoose')

const userLoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    firstName : {
        type: String,
        required:true
    },
    lastName : {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    gender : {
        type: String,
        required:true
    },
    phoneNumber : {
        type: Number,
        required:true
    },
    addressOne : {
        type: String,
        required:true
    },
    addressTwo : {
        type: String,
    },
    dateOfBirth : {
        type: Date,
        required:true
    },
    createdDateTime: {
        type: Date,
        required:true,
        default: Date.now
    },
})

module.exports = mongoose.model('UserLogin', userLoginSchema)