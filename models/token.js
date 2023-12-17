const mongoose = require('mongoose')
//auth Controller will handle token
const tokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    },
    createdDateTime: {
        type: Date,
        required:true,
        default: Date.now
    },
})

module.exports = mongoose.model('token', tokenSchema)