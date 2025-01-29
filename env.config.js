import dotenv from "dotenv";
import path from "path";

// ? Configuring dotenv with path
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_SECRET_KEY: process.env.PAYPAL_SECRET_KEY,
};

export default config;
