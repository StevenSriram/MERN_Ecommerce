import express from "express";

import {
  getProducts,
  recommendedProducts,
} from "../controllers/shop.controller.js";

const router = express.Router();
router.get("/products", getProducts);

router.get("/for-you", recommendedProducts);

export default router;
