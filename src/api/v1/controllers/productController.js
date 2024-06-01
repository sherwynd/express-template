const Product = require('../models/productModel');
const mongoose = require('mongoose');

// GET all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET an existing product
const getProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: `Product not found` });
    }

    const product = await Product.findById(id)
    if (!product) {
        res.status(404).json({ error: `Product not found` });
    }
    res.status(200).json(product);
}

// POST a new product
const createProduct = async (req, res) => {
    const { title, description, price, condition, category, brand, location, acquisition, creatorId } = req.body;
    const imgs = req.files.map(file => `uploads/${file.filename}`);

    try {
        const product = await Product.create({
            title,
            description,
            price,
            condition,
            category,
            brand,
            location,
            acquisition,
            imgs,
            creatorId,
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// DELETE an existing product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: `Product not found` });
    }

    const product = await Product.findOneAndDelete({ _id: id });
    if (!product) {
        res.status(400).json({ error: `Product not found` });
    }

    res.status(200).json(product);
}

// UPDATE an existing product
const updateProduct = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: `Product not found` });
    }
    const updateData = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        brand: req.body.brand,
        location: req.body.location,
        condition: req.body.condition,
        acquisition: req.body.acquisition,
        favouriteCount: req.body.favouriteCount,
    };

    if (req.files && req.files.length > 0) {
        updateData.imgs = req.files.map(file => file.path);
    }

    const product = await Product.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true }
    )

    if (!product) {
        res.status(400).json({ error: `Product not found` });
    }
    res.status(200).json(product);
}

//get products sell by a user using refId
const getProductsByUser = async (req, res) => {
    const { refId } = req.params;
    if (!refId) return res.status(400).json({ message: err.message });
    try {
        const products = await Product.find({ creatorId: refId });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getFavouriteProductsByUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: `Product not found` });
    }

    try {
        // Find products where their `favouriteCount` array includes `id`
        const products = await Product.find({
            favouriteCount: { $in: [id] }
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getProducts,
    getProduct,
    getProductsByUser,
    getFavouriteProductsByUser,
    createProduct,
    deleteProduct,
    updateProduct
}