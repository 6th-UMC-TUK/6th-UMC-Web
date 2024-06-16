import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 서버로부터 데이터를 가져오는 thunk 생성
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8080/musics");
      console.log(response.data); //데이터 구조 확인 겸 response.data 출력해봄
      return response.data;
    } catch (error) {
      // 에러가 발생하면 rejectWithValue를 사용하여 에러 메시지를 반환
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.amount++;
      state.totalQuantity++;
      state.totalAmount += item.price;
    },
    decrease(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.amount > 1) {
          item.amount--;
          state.totalQuantity--;
          state.totalAmount -= item.price;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
          state.totalQuantity--;
          state.totalAmount -= item.price;
        }
      }
    },
    removeItem(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.totalQuantity -= item.amount;
        state.totalAmount -= item.amount * item.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
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
  extraReducers: (builder) => {
    //각각 pending부터 rejected까지 그에 맞는 상태값 저장
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.totalQuantity = action.payload.reduce(
          (total, item) => total + item.amount,
          0
        );
        state.totalAmount = action.payload.reduce(
          (total, item) => total + item.price * item.amount,
          0
        );
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // 에러 메시지를 상태에 저장
      });
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
