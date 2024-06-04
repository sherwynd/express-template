const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    refId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
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
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
    favouriteCount: {
      type: [String],
      default: [],
    },
    creatorId: {
      type: String,
      required: true,
    },
    likeRefId: {
      type: [String],
      default: [],
    },
    muteBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 10; // Limit the number of images to 10
}

module.exports = mongoose.model("Blog", blogSchema);
