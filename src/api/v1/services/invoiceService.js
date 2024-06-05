const { formatDate, formatTime } = require("../../../utils/formatDateTime");
const ProductInvoice = require("../models/ProductInvoice");
const Product = require("../models/productModel");
const Event = require("../models/eventModel");
const sendEmail = require("../../../utils/sendEmail");
const userauths = require("../models/auth/userModel");

const findAllInvoiceByUser = async (refId) => {
  return await ProductInvoice.find({ refId });
};

const findAllInvoiceWithProductByUser = async (refId) => {
  const productInvoiceData = await ProductInvoice.find({ refId });
  const productIds = productInvoiceData.map((invoice) => invoice.productId);
  return await Product.find({ _id: { $in: productIds } });
};

const findAllInvoiceWithEventByUser = async (refId) => {
  const productInvoice = await ProductInvoice.find({ refId });
  const eventIds = productInvoice.map((invoice) => invoice.eventId);
  const events = await Event.find({ _id: { $in: eventIds } });
  return events.map((event) => ({
    ...event.toObject(),
    eventDate: formatDate(event.eventDate),
    eventTime: formatTime(event.eventTime),
  }));
};

const createInvoiceByUser = async (refId, productId, invoiceDetail) => {
  const user = await userauths.findOne({ refId });
  let item;
  let itemType;

  if (invoiceDetail.type === "product") {
    item = await Product.findById(productId);
    itemType = "productId";
    item.isAvailable = false;
    await item.save();
  } else if (invoiceDetail.type === "event") {
    item = await Event.findById(productId);
    itemType = "eventId";
  } else {
    throw new Error("Invalid invoice type");
  }

  const invoiceData = {
    [itemType]: productId,
    refId: refId,
    address_email: user.email,
    invoice_date: new Date(),
    invoice_amount: invoiceDetail.invoice_amount,
    invoice_address: invoiceDetail.invoice_address,
    payment_method: invoiceDetail.payment_method,
    type: invoiceDetail.type,
  };

  const invoice = new ProductInvoice(invoiceData);
  await invoice.save();

  // Send email
  sendEmail.sendEmail(invoice.address_email, "Invoice From Sport Mou", invoice);
  if (invoiceDetail.type === "event") {
    sendEmail.sendEventReminder(invoice.address_email, productId);
  }

  return invoice;
};

const removeFavouriteProduct = async (id, productId) => {
  try {
    // Find the user by refId
    const user = await userauths.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }

    // Find the product by productId
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new Error("Product not found");
    }

    // Remove the product ID from user's favourites array
    const userFavouritesIndex = user.favourites.indexOf(productId);
    if (userFavouritesIndex > -1) {
      user.favourites.splice(userFavouritesIndex, 1);
    } else {
      throw new Error("Product not found in user favourites");
    }

    // Remove the user ID from product's favouriteCount array
    const productFavouriteCountIndex = product.favouriteCount.indexOf(user._id);
    if (productFavouriteCountIndex > -1) {
      product.favouriteCount.splice(productFavouriteCountIndex, 1);
    } else {
      throw new Error("User not found in product favouriteCount");
    }

    // Save the updated user and product documents
    await user.save();
    await product.save();
    return product;
    // console.log("Favourite product removed successfully");
  } catch (error) {
    console.error("Error removing favourite product:", error);
  }
};

module.exports = {
  findAllInvoiceByUser,
  createInvoiceByUser,
  findAllInvoiceWithProductByUser,
  removeFavouriteProduct,
  findAllInvoiceWithEventByUser,
};
