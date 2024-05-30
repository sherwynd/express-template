const ProductInvoice = require("../models/ProductInvoice");
const Product = require("../models/productModel");
const Event = require("../models/eventModel");
const sendEmail = require("../../../utils/sendEmail");
const userauths = require("../models/auth/userModel");

const findAllInvoiceByUser = async (refId) => {
  return await ProductInvoice.find({ refId });
};

const findAllInvoiceWithProductByUser = async (refId) => {
  const ProductInvoice = await ProductInvoice.find({ refId });
  const productIds = ProductInvoice.map((invoice) => invoice.product_id);
  return await Product.find({ _id: { $in: productIds } });
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
    productId: productId,
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
  sendEmail(invoice.address_email, "Invoice From Sport Mou", invoice);

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

    console.log("Favourite product removed successfully");
  } catch (error) {
    console.error("Error removing favourite product:", error);
  }
};

module.exports = {
  findAllInvoiceByUser,
  createInvoiceByUser,
  findAllInvoiceWithProductByUser,
  removeFavouriteProduct,
};
