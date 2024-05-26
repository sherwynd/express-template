const ProductInvoice = require("../../models/ProductInvoice");
const mongoose = require("mongoose");

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


module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
}
