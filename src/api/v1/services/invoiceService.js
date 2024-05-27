const ProductInvoice = require("../models/ProductInvoice");
const Product = require("../models/productModel");
const Event = require("../models/eventModel");
const sendEmail = require("../../../utils/sendEmail");
const userauths = require("../models/auth/userModel");

const findAllInvoiceByUser = async (refId) => {
  return await ProductInvoice.find({ refId });
};

const createInvoiceByUser = async (refId, productId, invoiceDetail) => {
  const user = await userauths.findOne({ refId });
  // need to identify which is the type(passed from fontend)
  if ((invoiceDetail.type = "product")) {
    const product = await Product.find({ _id: productId });
  } else if ((invoiceDetail.type = "event")) {
    const event = await Event.find({ _id: productId });
  }
  const invoiceData = {
    product_id: productId,
    refId: refId,
    address_email: user.email,
    invoice_date: new Date(),
    invoice_amount: invoiceDetail.invoice_amount,
    invoice_address: invoiceDetail.invoice_address,
    type: invoiceDetail.type,
  };

  const invoice = new ProductInvoice(invoiceData);
  await invoice.save();

  // Send email
  sendEmail(invoice.address_email, "Invoice From Sport Mou", invoice);

  return invoice;
};

module.exports = {
  findAllInvoiceByUser,
  createInvoiceByUser,
};
