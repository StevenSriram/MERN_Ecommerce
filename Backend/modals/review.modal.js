import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewText: String,
    ratingValue: Number,
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
