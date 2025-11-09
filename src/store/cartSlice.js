import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: JSON.parse(localStorage.getItem('cart_item')) || [],
    totalProduct: JSON.parse(localStorage.getItem('cart_total')) || 0,
  },
  reducers: {
    saveInCartAction: (state, action) => {
      let copyCart = [...state.cart];
      let findIndex = null;

      copyCart.find((item, index) => {
        if (item.id === action.payload.id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex === null) {
        copyCart.push({
          ...action.payload,
          count: 1,
          cartTotal: action.payload.price,
        });
        state.totalProduct++;
      } else {
        copyCart[findIndex].count++;
        copyCart[findIndex].cartTotal =
          copyCart[findIndex].count * copyCart[findIndex].price;
      }
      state.cart = copyCart;
      localStorage.setItem('cart_item', JSON.stringify(copyCart));
      localStorage.setItem('cart_total', JSON.stringify(state.totalProduct));
    },

    deleteFromCartAction: (state, action) => {
      const updatedCart = state.cart.filter(item => item.id !== action.payload);
      state.cart = updatedCart;
      state.totalProduct = updatedCart.length;

      localStorage.setItem('cart_item', JSON.stringify(updatedCart));
      localStorage.setItem('cart_total', JSON.stringify(state.totalProduct));
    },
  },
});

export const { saveInCartAction, deleteFromCartAction } = cartSlice.actions;
export default cartSlice.reducer;
