import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    total: 0
  },
  reducers: {
    addProduct: (state, action) => {
      const { product, qty } = action.payload;
      let inCart = state.products.some((item) => item._id === product._id);

      if (inCart) {
        let newProducts = state.products.map((item) => {
          if (item._id === product._id) {
            return { ...item, quantity: (item.quantity += qty) };
          } else {
            return item;
          }
        });
        state.products = newProducts;
      }
      else {
        state.products.push({ ...product, quantity: qty, product: product._id });
      }

      state.total += product.price * qty;
    },
    reduceProduct: (state, action) => {
      const { product, qty } = action.payload;
      let cartProduct = state.products.find((item) => item._id === product._id);

      if (cartProduct.quantity - action.payload.qty >= 0) {
        let reduceTotal = product.price * qty;
        state.total -= reduceTotal;
      }

      let a = state.products.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: (item.quantity -= qty),
          };
        } else {
          return item;
        }
      });
      let b = a.filter((item) => item.quantity > 0);
      state.products = b;
    },
    clearCart: (state, action) => {
      state.products = [];
      state.total = 0;
    }
  }
})

export const { addProduct, reduceProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;