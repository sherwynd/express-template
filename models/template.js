const mongoose = require('mongoose')

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        required:true
    },
    createdDateTime: {
        type: Date,
        required:true,
        default: Date.now
    },
})

module.exports = mongoose.model('Template', templateSchema)