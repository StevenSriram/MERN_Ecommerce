import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,
  approvalURL: null,
  orderId: null,
};

const API_URL = "http://localhost:5000";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/order/create`,
        orderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "order/capturePayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/order/capture`,
        paymentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ? Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;

        sessionStorage.setItem("orderId", state.orderId);
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      });

    // ? Capture Payment
    builder
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePayment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(capturePayment.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default orderSlice.reducer;
