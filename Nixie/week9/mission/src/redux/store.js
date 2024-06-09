import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});
