import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,
  approvalURL: null,
  orderId: null,

  orderList: [],
  orderDetails: null,
};

const API_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:5000";

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

export const failedPayment = createAsyncThunk(
  "order/failedPayment",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/order/failed`, {
        orderId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (userId, { rejectWithValue }) => {
    try {
      let response;
      if (userId) {
        response = await axios.get(
          `${API_URL}/api/order/${encodeURIComponent(userId)}`
        );
      } else {
        response = await axios.get(`${API_URL}/api/order`);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/order/update/${encodeURIComponent(orderId)}`,
        {
          orderStatus,
        }
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
  reducers: {
    getOrderDetails: (state, action) => {
      state.orderDetails = state.orderList.find(
        (order) => order._id === action.payload
      );
    },
  },
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

    // ? Failed Payment
    builder
      .addCase(failedPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(failedPayment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(failedPayment.rejected, (state) => {
        state.isLoading = false;
      });

    // ? Get All Orders
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.success
          ? action.payload.allOrders
          : [];
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
      });

    // ? Update Order Status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { getOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
