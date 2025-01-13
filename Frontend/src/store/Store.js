import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import shopReducer from "./slices/shopSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    shop: shopReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
