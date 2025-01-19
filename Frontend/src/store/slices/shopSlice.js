import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,
  error: null,

  // ? List of all products
  productsList: [],
  page: 1,
  limit: 8,
  totalProducts: 0,

  // ? Recommended Products
  productsForYou: [],

  //* single Product Detail
  productDetails: {},
};

const API_URL = "http://localhost:5000";

export const getFilteredProducts = createAsyncThunk(
  "shop/getFilteredProducts",
  async (
    { filterParams, sortParams, pageParams, limitParams },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
        page: pageParams,
        limit: limitParams,
      });

      const response = await axios.get(
        `${API_URL}/api/shop/products?${queryParams}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRecommendedProducts = createAsyncThunk(
  "shop/getRecommendedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/shop/for-you`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    // ? Pagination
    resetPage: (state) => {
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },

    // ? get ProductDetails
    getProductDetails: (state, action) => {
      const productId = action.payload;

      state.productDetails = state.productsList.find(
        (product) => product._id === productId
      );

      // ! if product not found in productsList
      if (!state.productDetails) {
        state.productDetails = state.productsForYou.find(
          (product) => product._id === productId
        );
      }
    },
  },
  extraReducers: (builder) => {
    // ? Get Products State
    builder
      .addCase(getFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload?.success
          ? action.payload?.allProducts
          : [];
        state.totalProducts = action.payload?.success
          ? action.payload?.totalProducts
          : 0;
        state.error = null;
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });

    // ? Get Recommended Products State
    builder
      .addCase(getRecommendedProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecommendedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsForYou = action.payload?.success
          ? action.payload?.products
          : [];
        state.error = null;
      })
      .addCase(getRecommendedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { resetPage, setPage, getProductDetails } = shopSlice.actions;

export default shopSlice.reducer;
