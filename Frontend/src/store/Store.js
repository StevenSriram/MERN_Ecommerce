import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import shopReducer from "./slices/shopSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import orderReducer from "./slices/orderSlice";
import reviewReducer from "./slices/reviewSlice";
import featureReducer from "./slices/featureSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    shop: shopReducer,
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    review: reviewReducer,
    feature: featureReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
