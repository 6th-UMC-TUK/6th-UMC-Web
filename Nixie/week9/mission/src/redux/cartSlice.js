import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

const initialState = {
  cartItems: cartItems,
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      item.amount++;
    },
    decrease: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item.amount > 1) {
        item.amount--;
      } else {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.totalAmount = amount;
      state.totalPrice = total;
    },
  },
});

export const { increase, decrease, clearCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
