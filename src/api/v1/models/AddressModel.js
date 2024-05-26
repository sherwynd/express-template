const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    address_id: {
      type: String,
      required: true,
    },
    refId: {
      type: String,
      required: true,
    },
    address_email: {
      type: String,
      required: true,
    },
    address_name: {
      type: String,
      required: true,
    },
    address_phone: {
      type: Number,
      required: true,
    },
    address_line1: {
      type: String,
      required: true,
    },
    address_line2: {
      type: String,
      required: true,
    },
    address_city: {
      type: String,
      required: true,
    },
    address_zip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", addressSchema);
