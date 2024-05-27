const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Create a new rating
router.post('/rate', ratingController.createRating);

// Get ratings for a product
router.get('/product/:productId', ratingController.getProductRatings);

// Get ratings by a user
router.get('/user/:refId', ratingController.getUserRatings);

// Update a rating
router.put('/rate/:id', ratingController.updateRating);

// Delete a rating
router.delete('/rate/:id', ratingController.deleteRating);

module.exports = router;
