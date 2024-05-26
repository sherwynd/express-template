const mongoose = require("mongoose");

const productInvoiceSchema = new mongoose.Schema(
  {
    product_id: {
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
    invoice_date: {
      type: Date,
      required: true,
    },
    invoice_amount: {
      type: Number,
      required: true,
    },
    invoice_address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductInvoice", productInvoiceSchema);
