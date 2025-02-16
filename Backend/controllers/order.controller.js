import Order from "../modals/order.modal.js";
import Cart from "../modals/cart.modal.js";
import Product from "../modals/product.modal.js";

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
    const payment_json = createPaymentJSON(cartItems);

    // ? Creating a Payment
    paypal.payment.create(payment_json, async (error, payment) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, payment_json, message: error });
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

      // ! Delete Order Cache
      memoryCache.del(`orders-${userId}`);
      memoryCache.del("orders");

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
    return res.status(500).json({
      success: false,
      error: "server",
      message: error.message,
    });
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

    // ? Reducing Stock
    order.cartItems.forEach(async (item) => {
      const product = await Product.findById(item.productId);
      if (product) {
        if (product.totalStock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Out of Stock for ${product.title}`,
          });
        }
        product.totalStock -= item.quantity;
        product.sales += item.quantity;

        // ! Save Product
        await product.save();

        // ! Delete all Cache
        memoryCache.flushAll();
      }
    });

    // ? delete cart
    await Cart.findByIdAndDelete(order.cartId);
    // ! Delete Cart Cache
    memoryCache.del(`cart-${order.userId}`);

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

export const failedPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    // ? find Order
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    // ? Update Order Details
    order.paymentStatus = "failed";
    order.orderStatus = "failed";
    order.orderUpdateDate = Date.now();

    // ! delete cart
    await Cart.findByIdAndDelete(order.cartId);
    // ! Delete Cart Cache
    memoryCache.del(`cart-${order.userId}`);

    // ! Save Order
    await order.save();

    return res.status(402).json({ success: true, message: "Payment Failed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id required" });
    }

    // ! Check Order Cache
    if (memoryCache.has(`orders-${userId}`)) {
      const orderCache = memoryCache.get(`orders-${userId}`);
      return res
        .status(200)
        .json({ success: true, allOrders: JSON.parse(orderCache) });
    }

    const allOrders = await Order.find({ userId }).sort({ orderDate: -1 });
    if (!allOrders) {
      return res
        .status(404)
        .json({ success: false, message: "Orders Not Found" });
    }

    // ! Set Order Cache
    memoryCache.set(`orders-${userId}`, JSON.stringify(allOrders));

    return res.status(200).json({ success: true, allOrders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    // ! Check Order Cache
    if (memoryCache.has("orders")) {
      const orderCache = memoryCache.get("orders");
      return res
        .status(200)
        .json({ success: true, allOrders: JSON.parse(orderCache) });
    }

    const allOrders = await Order.find().sort({ orderDate: -1 });
    if (!allOrders) {
      return res
        .status(404)
        .json({ success: false, message: "Orders Not Found" });
    }

    // ! Set Order Cache
    memoryCache.set("orders", JSON.stringify(allOrders));

    return res.status(200).json({ success: true, allOrders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    // ? find Order and Update Order Details
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    // ! Delete Order Cache
    memoryCache.del("orders");
    memoryCache.del(`orders-${order.userId}`);

    return res
      .status(200)
      .json({ success: true, message: "Order Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
