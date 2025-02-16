import Product from "../modals/product.modal.js";

import { uploadCloudinary, deleteCloudinary } from "../utils/cloudinary.js";
import memoryCache from "../utils/nodeCache.js";

export const uploadImage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file?.buffer).toString("base64");

    const url = `data:${req.file?.mimetype};base64,${b64}`;
    const uploadResult = await uploadCloudinary(url);

    res.status(200).json({ success: true, uploadResult });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // ? Delete Image from Cloudinary
    await deleteCloudinary(id);

    res.status(200).json({ success: true, message: "Image Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    // * Check if all fields are filled
    const missing = Object.values(req.body).some((value) => !value);

    if (missing) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const product = new Product(req.body);

    // ! Add New Product
    await product.save();

    // ! Delete Product Cache
    memoryCache.del("products");
    memoryCache.del("low-stock");
    memoryCache.del("dashboard");

    res
      .status(200)
      .json({ success: true, message: "Product Added Successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    // ! check Product Cache Found
    if (memoryCache.has("products")) {
      const productCache = memoryCache.get("products");

      return res.status(200).json({
        success: true,
        allProducts: productCache,
      });
    }

    const allProducts = await Product.find({}).sort({ arrival: -1 });

    // ! Set Product Cache
    memoryCache.set("products", allProducts);

    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLowStockProducts = async (req, res) => {
  try {
    // ! check Product Cache Found
    if (memoryCache.has("low-stock")) {
      const productCache = memoryCache.get("low-stock");

      return res.status(200).json({
        success: true,
        allProducts: productCache,
      });
    }

    const allProducts = await Product.find({ totalStock: { $lt: 10 } }).sort({
      arrival: -1,
    });

    // ! Set Product Cache
    memoryCache.set("low-stock", allProducts);

    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ? Find by Id and Update Product
    const product = await Product.findByIdAndUpdate(id, req.body, {
      // * Ensures returning the newly updated document
      new: true,

      //* Ensures validation on updates
      runValidators: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    // ! Delete Product Cache
    memoryCache.del("products");
    memoryCache.del("low-stock");
    memoryCache.del("dashboard");

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // ? Find by Id and Delete Product
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    // ! Delete Product Cache
    memoryCache.del("products");
    memoryCache.del("low-stock");
    memoryCache.del("dashboard");

    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
