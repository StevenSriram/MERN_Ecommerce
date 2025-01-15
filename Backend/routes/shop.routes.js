import express from "express";
import cartRoutes from "./cart.routes.js";

import { getProducts } from "../controllers/shop.controller.js";

const router = express.Router();
router.get("/products", getProducts);

// ? Cart Routes
router.use("/cart", cartRoutes);

export default router;
