import express from "express";
import {
  createOrder,
  capturePayment,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);

export default router;
