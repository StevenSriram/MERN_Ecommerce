import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,
  reviewList: [],
};

const API_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:5000";

export const addReview = createAsyncThunk(
  "review/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/review/add`,
        reviewData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/review/${encodeURIComponent(productId)}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ? Add Review
    builder.addCase(addReview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addReview.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ? Get Reviews
    builder.addCase(getReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviewList = action.payload.success ? action.payload.reviews : [];
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default reviewSlice.reducer;
