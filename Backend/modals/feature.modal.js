import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

const discountSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    code: String,
    percent: Number,
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);

export { Banner, Discount };
