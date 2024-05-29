const express = require("express");
const upload = require('../uploadConfig/index');

const {
    getProducts,
    getProduct,
    getProductsByUser,
    createProduct,
    deleteProduct,
    updateProduct,
    getFavouriteProductsByUser
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/getProductsByUser/:refId', getProductsByUser);
router.get('/getFavouriteProductsByUser/:id', getFavouriteProductsByUser);
router.post('/', upload.array('imgs', 5), createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', upload.array('imgs', 5), updateProduct);
module.exports = router;