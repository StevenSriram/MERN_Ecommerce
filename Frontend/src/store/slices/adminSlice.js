import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  isLoading: false,
  error: null,

  imageLoading: false,
  uploadedImageURL: null,

  // ? List of all products
  productsList: [],
};

const API_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:5000";

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

export const deleteImage = createAsyncThunk(
  "admin/deleteImage",
  async (publicID, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/delete-image/${encodeURIComponent(publicID)}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/add-product`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "admin/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLowStockProducts = createAsyncThunk(
  "admin/getLowStockProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/low-stock`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  "admin/editProduct",
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/edit-product/${encodeURIComponent(productId)}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/delete-product/${encodeURIComponent(productId)}`
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
        state.imageLoading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.imageLoading = false;
        state.uploadedImageURL = action.payload?.uploadResult.url;
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.imageLoading = false;
        state.error = action.payload?.message;
      });

    // ? Delete Image State
    builder
      .addCase(deleteImage.pending, (state) => {
        state.imageLoading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.imageLoading = false;
        state.error = null;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.imageLoading = false;
        state.error = action.payload?.message;
      });

    // ? Add Product State
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });

    // ? Get Products State
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload?.success
          ? action.payload?.allProducts
          : [];
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });

    // ? Get Low Stock Products State
    builder
      .addCase(getLowStockProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLowStockProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload?.success
          ? action.payload?.allProducts
          : [];
        state.error = null;
      })
      .addCase(getLowStockProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });

    // ? Delete Product State
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });

    // ? Edit Product State
    builder
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { clearImageURL } = adminSlice.actions;

export default adminSlice.reducer;
