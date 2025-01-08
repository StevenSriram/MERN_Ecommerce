import { uploadCloudinary } from "../utils/cloudinary.js";

import Product from "../modals/Product.modal.js";

export const uploadImage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file?.buffer).toString("base64");

    const url = `data:${req.file?.mimetype};base64,${b64}`;
    const uploadResult = await uploadCloudinary(url);
    // ? console.log(uploadResult);

    res.status(200).json({ success: true, uploadResult });
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

    res
      .status(200)
      .json({ success: true, message: "Product Added Successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    // * Check if all fields are filled
    const missing = Object.values(req.body).some((value) => !value);

    if (missing) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

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

    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
