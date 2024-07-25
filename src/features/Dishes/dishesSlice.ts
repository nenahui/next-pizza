import { createSlice } from '@reduxjs/toolkit';
import type { Dish } from '../../types';
import { fetchDishes } from './dishesThunks';

export interface DishesState {
  dishes: Dish[];
  isFetching: boolean;
}

const initialState: DishesState = {
  dishes: [],
  isFetching: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDishes.fulfilled, (state, { payload: ApiDishes }) => {
        state.isFetching = false;
        state.dishes = ApiDishes;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectIsDishes: (state) => state.dishes,
  },
});

export const { selectIsDishes } = dishesSlice.selectors;
