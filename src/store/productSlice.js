import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    isLoading: false,
  },
  reducers: {
    saveAllProductsAction: (state, action) => {
      console.log(action.payload);
      state.allProducts = action.payload;
      state.isLoading = true;
    },
  },
});

export const { saveAllProductsAction } = productSlice.actions;
export default productSlice.reducer;