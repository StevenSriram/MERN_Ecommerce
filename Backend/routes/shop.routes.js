import express from "express";

import {
  getProducts,
  recommendedProducts,
  searchProducts,
} from "../controllers/shop.controller.js";

const router = express.Router();
router.get("/products", getProducts);

router.get("/for-you", recommendedProducts);

router.get("/search/:keyword", searchProducts);

export default router;
