import Order from "../modals/order.modal.js";
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

      console.log(newOrder);

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
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
