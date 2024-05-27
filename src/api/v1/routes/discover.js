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
router.get('/getByUser/:refId', getProductsByUser);
router.post('/', upload.array('imgs', 5), createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', upload.array('imgs', 5), updateProduct);
router.get('/getFavouriteProductsByUser/:refId', getFavouriteProductsByUser);
module.exports = router;