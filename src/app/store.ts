import { configureStore } from '@reduxjs/toolkit';
import { dishFormSlice } from '../features/DishForm/dishFormSlice';

export const store = configureStore({
  reducer: {
    dishForm: dishFormSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
