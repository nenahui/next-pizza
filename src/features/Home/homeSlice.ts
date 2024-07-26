import { createSlice } from '@reduxjs/toolkit';
import type { Dish } from '../../types';
import { fetchDishes } from './homeThunks';

export interface homeState {
  dishes: Dish[];
  isFetching: boolean;
}

const initialState: homeState = {
  dishes: [],
  isFetching: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDishes.fulfilled, (state, { payload: ApiDishes }) => {
        state.dishes = ApiDishes;
        state.isFetching = false;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectIsFetching: (state) => state.isFetching,
    selectIsDishes: (state) => state.dishes,
  },
});

export const { selectIsFetching, selectIsDishes } = homeSlice.selectors;
