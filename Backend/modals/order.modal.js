import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,

  // ? Cart Details
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],

  // ? Address Details
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: Number,
    phone: Number,
    notes: String,
  },

  // ? Order Details
  orderStatus: { type: String, default: "pending" },
  orderDate: { type: Date, default: Date.now },
  orderUpdateDate: { type: Date, default: Date.now },

  // ? Payment Details
  paymentMethod: String,
  paymentStatus: { type: String, default: "pending" },
  totalAmount: Number,

  // ! PayPal approval
  paymentId: String,
  payerId: String,
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
