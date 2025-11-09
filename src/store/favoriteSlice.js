import { createSlice } from "@reduxjs/toolkit";

const favoriteFromStorage = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    allFavorite: favoriteFromStorage,
    favoriteTotal: favoriteFromStorage.length
  },
  reducers: {
    updateFavoriteAction: (state, action) => {
      const product = action.payload;
      let copyFavorite = [...state.allFavorite];

      const findIndex = copyFavorite.findIndex(item => item.id === product.id);

      if (findIndex === -1) {
        copyFavorite.push(product);
      } else {
        copyFavorite.splice(findIndex, 1);
      }

      state.allFavorite = copyFavorite;
      state.favoriteTotal = copyFavorite.length;

      localStorage.setItem("favorites", JSON.stringify(copyFavorite));
    }
  }
});

export const { updateFavoriteAction } = favoriteSlice.actions;
export default favoriteSlice.reducer;
