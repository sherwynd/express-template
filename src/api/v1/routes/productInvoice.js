const express = require("express");
const router = express.Router();

const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getAllInvoicesByUser,
  makeInvoiceByUser,
  findAllInvoiceWithProductByUser,
} = require("../controllers/productInvoice/productInvoiceController");

// Setting up routes
router.get("/invoices", getAllInvoices);
router.get("/invoices/:id", getInvoiceById);
router.post("/invoices", createInvoice);
router.put("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);
router.get("/getAllInvoicesByUser/:refId", getAllInvoicesByUser);
router.post("/makeInvoiceByUser/:refId/:productId", makeInvoiceByUser);
router.get("/findAllInvoiceWithProductByUser/:refId", findAllInvoiceWithProductByUser);

module.exports = router;
