import { configureStore } from "@reduxjs/toolkit";
// slices
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    categoryStore: categorySlice,
    productStore: productSlice,
    cartStore: cartSlice,
  },
});

export default store;
