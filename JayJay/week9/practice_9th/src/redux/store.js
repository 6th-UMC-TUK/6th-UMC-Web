import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

//store 생성
export default configureStore({
  reducer: {
    todo: todoSlice,
  },
});
