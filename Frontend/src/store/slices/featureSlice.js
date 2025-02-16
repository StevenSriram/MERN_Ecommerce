import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,

  // ? List of all Shopping Banners
  bannerList: [],

  // ? List of all Discounts
  discountList: [],

  // ? Dashboard Data
  dashboardData: {},
};

const API_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:5000";

export const getDashboardData = createAsyncThunk(
  "feature/getDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/feature/dashboard`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const addDiscount = createAsyncThunk(
  "feature/addDiscount",
  async (discountData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/feature/add-discount`,
        discountData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDiscounts = createAsyncThunk(
  "feature/getDiscounts",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/feature/discounts/${encodeURIComponent(userId)}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  "feature/deleteDiscount",
  async (discountId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/feature/delete-discount/${encodeURIComponent(
          discountId
        )}`
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
    // ? Get Dashboard Data
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload.dashboardStats;
      })
      .addCase(getDashboardData.rejected, (state) => {
        state.isLoading = false;
      });
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

    // ? Add Discount
    builder
      .addCase(addDiscount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addDiscount.rejected, (state) => {
        state.isLoading = false;
      });

    // ? Get Discounts
    builder
      .addCase(getDiscounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.discountList = action.payload.discountCupons;
      })
      .addCase(getDiscounts.rejected, (state) => {
        state.isLoading = false;
      });

    // ? Delete Discount
    builder
      .addCase(deleteDiscount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteDiscount.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default featureSlice.reducer;
