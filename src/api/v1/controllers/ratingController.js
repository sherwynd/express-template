const Rating = require("../models/ratingModel");
const ratingService = require("../services/ratingService");
const Product = require("../models/productModel");

// Create a new rating
exports.createRating = async (req, res) => {
  try {
    const {
      productId,
      refId,
      ratingValue,
      ratingComment,
      raterRefId,
      productOwner,
    } = req.body;
    const rating = new Rating({
      productId,
      refId,
      ratingValue,
      ratingComment,
      raterRefId,
      productOwner,
    });

    const product = await Product.findById(productId);
    product.rated = true;
    await product.save();
    await rating.save();
    res.status(201).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get ratings for a product
exports.getProductRatings = async (req, res) => {
  try {
    const productRatings = await Rating.find({
      productId: req.params.productId,
    });
    res.status(200).json(productRatings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get ratings by a user
exports.getUserRatings = async (req, res) => {
  try {
    const userRatings = await Rating.find({ productOwner: req.params.refId });
    res.status(200).json(userRatings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a rating
exports.updateRating = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const { ratingValue, ratingComment } = req.body;

    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { ratingValue, ratingComment, ratingDate: Date.now() },
      { new: true }
    );

    res.status(200).json(updatedRating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
  try {
    const ratingId = req.params.id;
    await Rating.findByIdAndDelete(ratingId);

    res.status(200).json({ message: "Rating deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.allcommentsOfAUser = async (req, res) => {
  try {
    const { productOwner } = req.params;
    const ratings = await ratingService.allcommentsOfAUser(productOwner);
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.averageRatingOfAUser = async (req, res) => {
  try {
    const { productOwner } = req.params;
    const averageRating = await ratingService.averageRatingOfAUser(
      productOwner
    );
    res.status(200).json(averageRating);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
