import express from "express";

import {
  addCart,
  getCart,
  editCart,
  deleteCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:userId", getCart);

router.post("/add", addCart);

router.put("/edit", editCart);

router.delete("/delete/:userId/:productId", deleteCart);

export default router;
