import { configureStore } from "@reduxjs/toolkit";
// slices
import categorySlice from "./categorySlice";

const store = configureStore({
  reducer: {
    categoryStore: categorySlice,
  },
});

export default store;
