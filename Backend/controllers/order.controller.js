import Order from "../modals/order.modal.js";
import Cart from "../modals/cart.modal.js";

import memoryCache from "../utils/nodeCache.js";

import paypal, { createPaymentJSON } from "../utils/paypal.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      orderDate,
      orderUpdatedDate,
      paymentMethod,
      paymentStatus,
      totalAmount,
      paymentId,
      payerId,
    } = req.body;

    // ? Creating a Payment JSON for Paypal
    const payment_json = createPaymentJSON(cartItems, totalAmount);

    // ? Creating a Payment
    paypal.payment.create(payment_json, async (error, payment) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, payment_json, message: error.message });
      }

      // * Creating a New Order
      const newOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        orderDate,
        orderUpdatedDate,
        paymentMethod,
        paymentStatus,
        totalAmount,
        paymentId,
        payerId,
      });

      // ! Add New Order
      await newOrder.save();

      // ? get Approval URL
      const approvalURL = payment.links.find(
        (link) => link.rel === "approval_url"
      )?.href;

      return res.status(200).json({
        success: true,
        approvalURL,
        orderId: newOrder._id,
        message: "Order Created Successfully",
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "server", message: error.message });
  }
};

export const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    // ? find Order
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    // ? Update Order Details
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.orderUpdateDate = Date.now();
    order.paymentId = paymentId;
    order.payerId = payerId;

    // ! delete cart
    await Cart.findByIdAndDelete(order.cartId);
    // ! Delete Cart Cache
    memoryCache.del(`cart-${order.cartId}`);

    // ! Save Order
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order Confirmed",
      order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
