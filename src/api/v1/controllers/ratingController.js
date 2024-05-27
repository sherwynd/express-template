const Rating = require('../models/ratingModel');

// Create a new rating
exports.createRating = async (req, res) => {
  try {
    const { productId, refId, ratingValue, ratingComment } = req.body;
    const rating = new Rating({
      productId,
      refId,
      ratingValue,
      ratingComment,
    });

    await rating.save();
    res.status(201).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get ratings for a product
exports.getProductRatings = async (req, res) => {
  try {
    const productRatings = await Rating.find({ productId: req.params.productId });
    res.status(200).json(productRatings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get ratings by a user
exports.getUserRatings = async (req, res) => {
  try {
    const userRatings = await Rating.find({ refId: req.params.refId });
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

    res.status(200).json({ message: 'Rating deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
