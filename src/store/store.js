import { configureStore } from "@reduxjs/toolkit";
// slices
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";

const store = configureStore({
  reducer: {
    categoryStore: categorySlice,
    productStore: productSlice
  },
});

export default store;
