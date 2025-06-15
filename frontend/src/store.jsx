import { configureStore } from '@reduxjs/toolkit';

import productReducer from './feature/Product/productSlice';
import productDetailReducer from './feature/Product/productDetailsSlice';
import userReducer from './feature/User/userSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails:productDetailReducer,

    user: userReducer,
  }
});

