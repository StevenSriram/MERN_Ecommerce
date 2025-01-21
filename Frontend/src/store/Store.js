import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import shopReducer from "./slices/shopSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    shop: shopReducer,
    cart: cartReducer,
    address: addressReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
