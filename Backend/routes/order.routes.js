import express from "express";
import {
  createOrder,
  capturePayment,
  failedPayment,
  getOrders,
  getAllOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.post("/failed", failedPayment);

router.get("/:userId", getOrders);
router.get("/", getAllOrders);

export default router;
