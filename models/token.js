const mongoose = require("mongoose");
//auth Controller will handle token
const tokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  refId: {
    type: String,
    required: true,
  },
  createdDateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("token", tokenSchema);
