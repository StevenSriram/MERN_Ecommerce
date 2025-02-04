import express from "express";
import {
  createOrder,
  capturePayment,
  failedPayment,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.post("/failed", failedPayment);

router.get("/:userId", getOrders);
router.get("/", getAllOrders);
router.put("/update/:orderId", updateOrderStatus);

export default router;
