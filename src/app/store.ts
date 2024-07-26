import { configureStore } from '@reduxjs/toolkit';
import { dishesSlice } from '../features/Dishes/dishesSlice';
import { dishFormSlice } from '../features/DishForm/dishFormSlice';
import homeSlice from '../features/Home/homeSlice';

export const store = configureStore({
  reducer: {
    dishForm: dishFormSlice.reducer,
    dishes: dishesSlice.reducer,
    home: homeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
