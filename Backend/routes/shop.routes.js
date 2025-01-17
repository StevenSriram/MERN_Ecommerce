import express from "express";

import { getProducts } from "../controllers/shop.controller.js";

const router = express.Router();
router.get("/products", getProducts);

export default router;
