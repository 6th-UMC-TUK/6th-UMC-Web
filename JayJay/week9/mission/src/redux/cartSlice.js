import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItem";

const initialState = {
  items: cartItems,
  totalQuantity: cartItems.reduce((total, item) => total + item.amount, 0),
  totalAmount: cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  ),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      item.amount++;
    },
    decrease(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item.amount > 1) {
        item.amount--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    calculateTotals(state) {
      let totalQuantity = 0;
      let totalAmount = 0;
      state.items.forEach((item) => {
        totalQuantity += item.amount;
        totalAmount += item.amount * item.price;
      });
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
