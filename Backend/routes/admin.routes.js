import express from "express";

import { uploadImage } from "../controllers/admin.controller.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("imageFile"), uploadImage);

export default router;
