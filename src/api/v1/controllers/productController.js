const Product = require('../models/productModel');
const mongoose = require('mongoose');

// GET all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({createdAt: -1});
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// GET an existing product
const getProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: `Product not found`});
    }

    const product = await Product.findById(id)
    if (!product) {
        res.status(404).json({error: `Product not found`});
    }
    res.status(200).json(product);
}

// POST a new product
const createProduct = async (req, res) => {
    const { title, description, price, condition, category, brand, location, acquisition } = req.body;
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
            imgs
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// DELETE an existing product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: `Product not found`});
    }

    const product = await Product.findOneAndDelete({_id: id});
    if (!product) {
        res.status(400).json({error: `Product not found`});
    }

    res.status(200).json(product);
}

// UPDATE an existing product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: `Product not found`});
    }
    const product = await Product.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if (!product) {
        res.status(400).json({error: `Product not found`});
    }
    res.status(200).json(product);
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}