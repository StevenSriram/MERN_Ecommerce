import express from "express";

import {
  addBanner,
  getBanners,
  deleteBanner,
  addDiscount,
  getDiscounts,
  deleteDiscount,
} from "../controllers/feature.controller.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

// * Dashboard Routes
router.get("/dashboard", getDashboardData);

// * Banner Routes
router.post("/add-banner", addBanner);
router.get("/banners", getBanners);
router.delete("/delete-banner/:id", deleteBanner);

// * Discount Routes
router.post("/add-discount", addDiscount);
router.get("/discounts/:userId", getDiscounts);
router.delete("/delete-discount/:id", deleteDiscount);

export default router;
