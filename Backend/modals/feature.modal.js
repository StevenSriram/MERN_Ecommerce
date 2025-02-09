import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", bannerSchema);

export { Banner };
