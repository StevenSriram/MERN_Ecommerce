import Product from "../modals/product.modal.js";

export const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
