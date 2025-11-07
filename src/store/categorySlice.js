import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice ({
  name: 'category',
  initialState: {
    allCategory: [],
    isLoading: false,
  },
  reducers: {
    saveAllCategoryAction : (state, action) => {
      state.allCategory = action.payload;
      state.isLoading = true;
    }
  }
})

export const {saveAllCategoryAction} = categorySlice.actions;
export default categorySlice.reducer;