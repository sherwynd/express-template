const mongoose = require("mongoose");
const schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
        text: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
    // user: {
    //     id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    //     },
    //     name: {
    //     type: String,
    //     required: true,
    //     },
    //     avatar: {
    //     type: String,
    //     required: true,
    //     },
    // },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String], // Array of image URLs
        default: []
    },
    comments: {
        type: [commentSchema],
        default: []
        
    },
    favouriteCount: {
        type: [String],
        required: true
        
    },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 10; // Limit the number of images to 10
}

module.exports = mongoose.model("Blog", blogSchema);
