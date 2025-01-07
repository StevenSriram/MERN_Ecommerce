import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const storage = new multer.memoryStorage();

// * Configuring Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log(process.env.CLOUDINARY_API_KEY);

// * Uploading Image to Cloudinary
const uploadCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return response;
};

const upload = multer({ storage });

export { upload, uploadCloudinary };
