import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,

  // ? List of all Shopping Banners
  bannerList: [],
};

const API_URL = "http://localhost:5000";

export const addBanner = createAsyncThunk(
  "feature/addBanner",
  async (bannerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/feature/add-banner`,
        bannerData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBanners = createAsyncThunk(
  "feature/getBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/feature/banners`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "feature/deleteBanner",
  async (bannerId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/feature/delete-banner/${encodeURIComponent(bannerId)}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ? Add Banner
    builder
      .addCase(addBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addBanner.rejected, (state) => {
        state.isLoading = false;
      });

    // ? Get Banners
    builder
      .addCase(getBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bannerList = action.payload.banners;
      })
      .addCase(getBanners.rejected, (state) => {
        state.isLoading = false;
      });

    // ? Delete Banner
    builder
      .addCase(deleteBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteBanner.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default featureSlice.reducer;
