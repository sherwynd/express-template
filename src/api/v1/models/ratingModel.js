const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ratingSchema = new schema({
  productId: {
    type: String,
    required: true,
  },
  raterRefId: {
    type: String,
    required: true,
  },
  productOwner: {
    type: String,
    required: true,
  },
  ratingValue: {
    type: Number,
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
