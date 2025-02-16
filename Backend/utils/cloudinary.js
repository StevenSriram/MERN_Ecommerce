import { dotenvConfig } from "../../config.js";
dotenvConfig();

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const storage = new multer.memoryStorage();

// * Configuring Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// * Uploading Image to Cloudinary
const uploadCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file, {
    resource_type: "image",
    folder: "ecommerce",
  });

  return response;
};

const deleteCloudinary = async (publicID) => {
  const response = await cloudinary.uploader.destroy(publicID, {
    type: "upload",
    resource_type: "image",
  });

  return response;
};

const upload = multer({ storage });

export { upload, uploadCloudinary, deleteCloudinary };
