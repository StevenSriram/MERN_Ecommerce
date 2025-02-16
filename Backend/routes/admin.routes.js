import express from "express";

import { upload } from "../utils/cloudinary.js";

import {
  uploadImage,
  deleteImage,
  addProduct,
  getProducts,
  getLowStockProducts,
  editProduct,
  deleteProduct,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/upload-image", upload.single("imageFile"), uploadImage);
router.delete("/delete-image/:id", deleteImage);

router.get("/products", getProducts);
router.get("/low-stock", getLowStockProducts);

router.post("/add-product", addProduct);
router.put("/edit-product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
