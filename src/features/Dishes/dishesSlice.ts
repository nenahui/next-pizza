import { createSlice } from '@reduxjs/toolkit';
import type { Dish } from '../../types';
import { fetchDishes } from './dishesThunks';

export interface DishesState {
  dishes: Dish[];
  isDishesFetching: boolean;
}

const initialState: DishesState = {
  dishes: [],
  isDishesFetching: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isDishesFetching = true;
      })
      .addCase(fetchDishes.fulfilled, (state, { payload: ApiDishes }) => {
        state.isDishesFetching = false;
        state.dishes = ApiDishes;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.isDishesFetching = false;
      });
  },
  selectors: {
    selectIsDishesFetching: (state) => state.isDishesFetching,
    selectIsDishes: (state) => state.dishes,
  },
});

export const { selectIsDishes, selectIsDishesFetching } = dishesSlice.selectors;
