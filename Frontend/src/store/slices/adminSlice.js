import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,
  error: null,

  uploadedImageURL: null,
};

const API_URL = "http://localhost:5000";

export const uploadImage = createAsyncThunk(
  "admin/uploadImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearImageURL: (state) => {
      state.uploadedImageURL = null;
    },
  },
  extraReducers: (builder) => {
    // ? Upload Image State
    builder
      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadedImageURL = action.payload?.uploadResult.url;
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearImageURL } = adminSlice.actions;

export default adminSlice.reducer;
