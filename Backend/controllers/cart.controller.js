import Cart from "../modals/cart.modal.js";
import Product from "../modals/product.modal.js";

export const addCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ? Check Product Exists
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    // ? Check Cart Exists or Create
    const cart = Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const addIdx = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (addIdx === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[addIdx].quantity += quantity;
    }

    // ! Save Cart
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id required" });
    }

    // ? Check Cart Exists and populate product
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not Found" });
    }

    // * verify Cart Items are Valid
    const validItems = cart.items.filter((item) => item.productId);

    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      // ! Save valid Items
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId?._id,
      image: item.productId?.image,
      title: item.productId?.title,
      price: item.productId?.price,
      salePrice: item.productId?.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      cart: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not Found" });
    }

    const editIdx = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (editIdx === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found in Cart" });
    }

    cart.items[editIdx].quantity = quantity;

    // ! Save Cart
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId?._id,
      image: item.productId?.image,
      title: item.productId?.title,
      price: item.productId?.price,
      salePrice: item.productId?.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      cart: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not Found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // ! Save Cart
    await cart.save();

    await cart.populate({
      path: "items.productId", // ! populate again
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId?._id,
      image: item.productId?.image,
      title: item.productId?.title,
      price: item.productId?.price,
      salePrice: item.productId?.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      cart: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
