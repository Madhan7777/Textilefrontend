import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { saveToLocalStorage, loadFromLocalStorage } from './localStorageMiddleware';

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
