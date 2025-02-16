import { dotenvConfig } from "../../config.js";
dotenvConfig();

import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

export const createPaymentJSON = (cartItems) => {
  const totalAmount = cartItems
    .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
    .toFixed(2);

  const payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.CLIENT_URL}/payment-return`,
      cancel_url: `${process.env.CLIENT_URL}/shop/payment-status`,
    },
    transactions: [
      {
        item_list: {
          items: cartItems.map((item) => ({
            name: item.title,
            sku: item.productId,
            price: item.price,
            currency: "USD",
            quantity: item.quantity,
          })),
        },
        amount: {
          currency: "USD",
          total: totalAmount,
        },
        description: "Order Description",
      },
    ],
  };
  return payment_json;
};

export default paypal;
