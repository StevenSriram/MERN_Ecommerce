import express from "express";

import {
  addBanner,
  getBanners,
  deleteBanner,
} from "../controllers/feature.controller.js";

const router = express.Router();

router.post("/add-banner", addBanner);
router.get("/banners", getBanners);
router.delete("/delete-banner/:id", deleteBanner);

export default router;
