const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ratingSchema = new schema({
  productId: {
    type: String,
    required: true,
  },
  refId: {
    type: String,
    required: true,
    min: 1,
    max: 5,
  },
  ratingValue: {
    type: String,
    required: true,
  },
  ratingComment: {
    type: String,
    required: true,
  },
  ratingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rating", ratingSchema);
