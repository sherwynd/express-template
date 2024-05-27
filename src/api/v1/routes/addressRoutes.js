const express = require('express');
const addressController = require('../controllers/address/addressController');

const router = express.Router();

router.post('/:refId', addressController.addAddress);
router.get('/:refId', addressController.getAddressByUser);
router.delete('/:refId/:address_id', addressController.deleteAddress);


module.exports = router;
