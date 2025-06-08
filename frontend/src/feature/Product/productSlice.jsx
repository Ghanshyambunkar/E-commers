import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching products
export const getProducts = createAsyncThunk(
  'products/fetchAll',
  async ({ keyword = "", currentPage = 1 ,price=[0,2500]}, { rejectWithValue }) => {
    try {
          const response = await axios.get(
          `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
        );
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || 'Something went wrong';
      return rejectWithValue(message);
    }
  }
);



const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    products: [],
    productsCount: 0,
    resultPerPage: 1,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
