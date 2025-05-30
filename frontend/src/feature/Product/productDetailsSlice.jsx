import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk(
  'productDetails/fetchAll',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productDetailsSlice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    product: {},
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product; // assuming response has { product: {...} }
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
