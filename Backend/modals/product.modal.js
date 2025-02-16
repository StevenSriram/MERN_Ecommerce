import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  category: String,
  brand: String,
  price: Number,
  salePrice: Number,
  totalStock: Number,
  rating: { type: Number, default: 0.0 },
  sales: { type: Number, default: 0 },
  arrival: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
