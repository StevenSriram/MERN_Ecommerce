import Review from "../modals/review.modal.js";
import Order from "../modals/order.modal.js";
import Product from "../modals/product.modal.js";

import memoryCache from "../utils/nodeCache.js";

export const addReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewText, ratingValue } = req.body;

    // ? check User Buy Product or Not
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "delivered",
    });
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "You need to Buy this product to Review it",
      });
    }

    // ? check Review Exists or Not
    const reviewExists = await Review.findOne({ productId, userId });

    if (reviewExists) {
      return editReview(reviewExists, res, productId, reviewText, ratingValue);
    }

    // ? Add New Review
    const review = new Review({
      productId,
      userId,
      userName,
      reviewText,
      ratingValue,
    });

    // ! Save Review
    await review.save();

    // ? Update Product Avg Rating
    const reviews = await Review.find({ productId });
    const total = reviews.reduce((sum, review) => sum + review.ratingValue, 0);
    const avgRating = reviews.length > 0 ? total / reviews.length : 0;

    // ! Update Product
    await Product.findByIdAndUpdate(
      productId,
      { rating: avgRating },
      { new: true }
    );

    // ! Delete all Cache
    memoryCache.flushAll();

    return res
      .status(201)
      .json({ success: true, message: "Review Added Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const editReview = async (
  reviewExists,
  res,
  productId,
  reviewText,
  ratingValue
) => {
  try {
    reviewExists.reviewText = `${reviewExists.reviewText}. ${reviewText}`;
    reviewExists.ratingValue = ratingValue;
    reviewExists.createdAt = Date.now();

    // ! Save Review
    await reviewExists.save();

    // ? Update Product Avg Rating
    const reviews = await Review.find({ productId });
    const total = reviews.reduce((sum, review) => sum + review.ratingValue, 0);
    const avgRating = reviews.length > 0 ? total / reviews.length : 0;

    // ! Update Product
    await Product.findByIdAndUpdate(
      productId,
      { rating: avgRating },
      { new: true }
    );

    // ! Delete all Cache
    memoryCache.flushAll();

    return res
      .status(201)
      .json({ success: true, message: "Review Edited Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // ! Check Review Cache
    if (memoryCache.has(`reviews-${productId}`)) {
      const reviewCache = memoryCache.get(`reviews-${productId}`);
      return res.status(200).json({ success: true, reviews: reviewCache });
    }

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    if (!reviews) {
      return res
        .status(404)
        .json({ success: false, message: "No Reviews for this Product" });
    }

    // ! Set Review Cache
    memoryCache.set(`reviews-${productId}`, reviews);

    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
