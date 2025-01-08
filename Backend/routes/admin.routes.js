import express from "express";

import { upload } from "../utils/cloudinary.js";

import {
  uploadImage,
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/upload-image", upload.single("imageFile"), uploadImage);

router.get("/products", getProducts);

router.post("/add-product", addProduct);
router.put("/edit-product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
