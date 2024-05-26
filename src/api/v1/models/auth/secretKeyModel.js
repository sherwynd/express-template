const mongoose = require("mongoose");
//auth Controller will handle token
const secretKeySchema = new mongoose.Schema({
  secretKey: {
    type: String,
    required: true,
  },
  refId: {
    type: String,
    required: true,
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

module.exports = mongoose.model("secretkeyauths", secretKeySchema);
