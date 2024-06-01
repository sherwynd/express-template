const { required } = require('joi');
const mongoose = require('mongoose');

const schema = mongoose.Schema

const productSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    acquisition: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    favouriteCount: {
        type: [String],
        default: []
    },
    imgs: {
        type: [String],
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    rated: {
        type: Boolean,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)