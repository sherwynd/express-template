const ProductInvoice = require("../models/ProductInvoice");
const Product = require("../models/productModel");
const Rating = require("../models/ratingModel");
const user = require("../models/auth/userModel");

const averageRatingOfAUser = async (productOwner) => {
  const ratings = await Rating.find({ productOwner: productOwner });
  const totalRating = ratings.reduce(
    (acc, rating) => acc + rating.ratingValue,
    0
  );
  return totalRating / ratings.length;
};

// const allcommentsOfAUser = async (productOwner) => {
//   const user = await user.findOne({ refId: productOwner });
//   return await Rating.find({ productOwner });
// };

const allcommentsOfAUser = async (productOwner) => {
  try {
    const ratings = await Rating.find({ productOwner });
    const ratingsWithUserDetails = await Promise.all(ratings.map(async (rating) => {
      const userDetail = await user.findOne({ refId: rating.raterRefId });
      return { ...rating.toObject(), userDetail };
    }));
    return ratingsWithUserDetails;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user and ratings");
  }
};


module.exports = {
  averageRatingOfAUser,
  allcommentsOfAUser,
};
