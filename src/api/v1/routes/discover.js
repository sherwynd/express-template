const express = require("express");
const upload = require('../uploadConfig/index');
const multer  = require('multer');
// const upload = multer({ dest: './uploads/' });

const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', upload.array('imgs', 5), createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);
module.exports = router;