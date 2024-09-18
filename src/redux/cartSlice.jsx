import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}, // Stores cart items { productId: quantity }
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { productId, quantity, price } = action.payload;
      state.items[productId] = (state.items[productId] || 0) + quantity;
      state.totalAmount += price * quantity;
    },
    removeItem: (state, action) => {
      const { productId, quantity, price } = action.payload;
      if (state.items[productId]) {
        state.totalAmount -= price * quantity;
        if (state.items[productId] <= quantity) {
          delete state.items[productId];
        } else {
          state.items[productId] -= quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
