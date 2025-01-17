import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,

  // ? List of Cart Items
  cartItems: [],
};

const API_URL = "http://localhost:5000";

export const addToCart = createAsyncThunk(
  "cart/addCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/cart/add`, {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCart",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/cart/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editCartQuantity = createAsyncThunk(
  "cart/editCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/cart/edit`, {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart/deleteCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/cart/delete/${userId}/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ? Add to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
      });

    // ? Get cart items
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
      });

    // ? Edit cart quantity
    builder
      .addCase(editCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(editCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
      });

    // ? Delete from cart
    builder
      .addCase(deleteFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { computeCartTotal } = cartSlice.actions;

export default cartSlice.reducer;
