import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart_item")) || [],
    totalProduct: JSON.parse(localStorage.getItem("cart_total")) || 0,
    totalPrice: 0,
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

      // ispravno računanje totalPrice
      state.totalPrice = subTotal(copyCart);

      state.cart = copyCart;
      localStorage.setItem("cart_item", JSON.stringify(copyCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProduct));
    },
    deleteFromCartAction: (state, action) => {
      const productId = action.payload;

      const deletedItem = state.cart.find((item) => item.id === productId);
      if (!deletedItem) return;

      const updatedCart = state.cart.filter((item) => item.id !== productId);

      state.cart = updatedCart;
      state.totalProduct = updatedCart.reduce(
        (acc, item) => acc + item.count,
        0
      );
      state.totalPrice = updatedCart.reduce(
        (acc, item) => acc + item.cartTotal,
        0
      );

      localStorage.setItem("cart_item", JSON.stringify(updatedCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProduct));
    },
    setPriceHandlerAction: (state, action) => {
      const { increment, index,} = action.payload;
      let copyCart = [...state.cart];

      
      copyCart[index].cartTotal += copyCart[index].price * increment;
      state.totalPrice = subTotal(copyCart);

      if(copyCart[index].count === 1 && increment === -1){
        copyCart.splice(index, 1);
        state.totalProduct--;
      }else{
        copyCart[index].count += increment;
      }
      
      state.cart = copyCart;
       localStorage.setItem("cart_item", JSON.stringify(copyCart));
      localStorage.setItem("cart_total", JSON.stringify(state.totalProduct));
    }
    },
  },

);

function subTotal(arrayCart) {
  return arrayCart.reduce((acc, current) => {
    return acc + current.cartTotal;
  }, 0);
}

export const { saveInCartAction, deleteFromCartAction, setPriceHandlerAction } = cartSlice.actions;
export default cartSlice.reducer;
