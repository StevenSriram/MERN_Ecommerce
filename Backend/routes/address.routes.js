import express from "express";

import {
  addAddress,
  getAddresses,
  editAddress,
  deleteAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/:userId", getAddresses);
router.put("/edit/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

export default router;
