const ProductInvoice = require("../../models/ProductInvoice");
const mongoose = require("mongoose");
const InvoiceService = require("../../services/invoiceService");

// Controller to get all product invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await ProductInvoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a single product invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await ProductInvoice.findById(req.params.id);
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ error: "Invoice not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to create a new product invoice
const createInvoice = async (req, res) => {
  try {
    const invoice = new ProductInvoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a product invoice
const updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await ProductInvoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a product invoice
const deleteInvoice = async (req, res) => {
  try {
    await ProductInvoice.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllInvoicesByUser = async (req, res) => {
  try {
    const invoices = await InvoiceService.findAllInvoiceByUser(
      req.params.refId
    );
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create an invoice and send it by email
const makeInvoiceByUser = async (req, res) => {
  try {
    const { refId, productId } = req.params;
    const invoiceDetail = req.body;
    const invoice = await InvoiceService.createInvoiceByUser(
      refId,
      productId,
      invoiceDetail
    );
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAllInvoiceWithProductByUser = async (req, res) => {
  try {
    const invoices = await InvoiceService.findAllInvoiceWithProductByUser(
      req.params.refId
    );
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAllInvoiceWithEventByUser = async (req, res) => {
  try {
    const invoices = await InvoiceService.findAllInvoiceWithEventByUser(
      req.params.refId
    );
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const removeFavouriteProduct = async (req, res) => {
  try {
    const { refId, productId } = req.params;
    const product = await InvoiceService.removeFavouriteProduct(refId, productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getAllInvoicesByUser,
  makeInvoiceByUser,
  findAllInvoiceWithProductByUser,
  removeFavouriteProduct,
  findAllInvoiceWithEventByUser,
};
