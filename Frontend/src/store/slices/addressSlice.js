import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,
  addresses: [], // ? List of all addresses
};

const API_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:5000";

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/address/add`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/address/${encodeURIComponent(userId)}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/address/delete/${encodeURIComponent(
          userId
        )}/${encodeURIComponent(addressId)}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/address/edit/${encodeURIComponent(
          userId
        )}/${encodeURIComponent(addressId)}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ? Add Address
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
      });

    // ? Get Addresses
    builder
      .addCase(getAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload.success
          ? action.payload.addresses
          : [];
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.isLoading = false;
      });

    // ? Delete Address
    builder
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
      });

    // ? Edit Address
    builder
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
