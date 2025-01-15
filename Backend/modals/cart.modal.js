import mongoose from "mongoose";

/* _id = mongoose.Schema.Types.ObjectId */

const CartSchema = new mongoose.Schema({
  // ? which User's Cart
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // ? list of Cart Items
  items: [
    {
      // ? which Product
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      // ? product Quantity
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
