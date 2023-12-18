const mongoose = require("mongoose");
//template for reference
const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
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

module.exports = mongoose.model("Template", templateSchema);
