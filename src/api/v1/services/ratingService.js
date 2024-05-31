const ProductInvoice = require("../models/ProductInvoice");
const Product = require("../models/productModel");
const Rating = require("../models/ratingModel");

const averageRatingOfAUser = async (productOwner) => {
  const ratings = await Rating.find({ productOwner: productOwner });
  const totalRating = ratings.reduce(
    (acc, rating) => acc + rating.ratingValue,
    0
  );
  return totalRating / ratings.length;
};

const allcommentsOfAUser = async (productOwner) => {
  return await Rating.find({ productOwner });
};

module.exports = {
    averageRatingOfAUser,
    allcommentsOfAUser,
}