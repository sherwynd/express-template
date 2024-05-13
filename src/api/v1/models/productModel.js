const mongoose = require('mongoose');

const schema = mongoose.Schema

const productSchema = new schema({
    name: {
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
    // listed: {
    //     type: Date,
    //     default: Date.now
    // },
    acquisition: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    favouriteCount: {
        type: Number,
        default: 0
    }
    // img: {
    //     type: String,
    //     required: true
    // },
    // user_ref: {
    //     type: schema.Types.ObjectId,
    //     ref: 'User'
    // }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)