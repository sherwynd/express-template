const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Create a new rating
router.post('/rate', ratingController.createRating);

// Get ratings for a product
router.get('/product/:productId', ratingController.getProductRatings);

// Get ratings by the productOwner
router.get('/user/:refId', ratingController.getUserRatings);

// Update a rating
router.put('/rate/:id', ratingController.updateRating);

// Delete a rating
router.delete('/rate/:id', ratingController.deleteRating);

//This is to get all the ratings by other users to the current user
router.get('/allcommentsOfAUser/:productOwner', ratingController.allcommentsOfAUser);

//This is to get the average rating of the current user (average of all the ratings by other users)
router.get('/averageRatingOfAUser/:productOwner', ratingController.averageRatingOfAUser);

module.exports = router;
