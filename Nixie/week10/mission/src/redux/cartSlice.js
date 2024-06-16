import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8080/musics');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response.data);
        }, 1000); // 2 seconds delay
      });
    } catch (error) {
      const errorMessage = error.response?.data || '서버 응답이 없습니다.';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalPrice: 0,
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.amount++;
        state.totalAmount++;
        state.totalPrice += item.price;
      }
    },
    decrease: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        if (item.amount > 1) {
          item.amount--;
          state.totalAmount--;
          state.totalPrice -= item.price;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
          state.totalAmount--;
          state.totalPrice -= item.price;
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
        state.totalAmount = action.payload.reduce((total, item) => total + item.amount, 0);
        state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.amount, 0);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        alert(action.payload);
      });
  },
});

export const { increase, decrease, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
