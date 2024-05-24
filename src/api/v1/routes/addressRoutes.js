const express = require('express');
const addressController = require('../controllers/address/addressController');

const router = express.Router();

// Create a new address
router.post('/addresses', addressController.createAddress);

// Get all addresses
router.get('/addresses', addressController.getAddresses);

// Get address by ID
router.get('/addresses/:id', addressController.getAddressById);

// Update address by ID
router.patch('/addresses/:id', addressController.updateAddress);

// Delete address by ID
router.delete('/addresses/:id', addressController.deleteAddress);

module.exports = router;
