import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { ApiDishes, Dish } from '../../types';

export const fetchDishes = createAsyncThunk<Dish[], void, { state: RootState }>(
  'home/fetch',
  async () => {
    const { data: dishes } = await axiosApi.get<ApiDishes | null>('pizzeria/dishes.json');

    if (dishes === null) {
      return [];
    }

    return Object.keys(dishes).map((id) => ({
      id,
      ...dishes[id],
    }));
  }
);

export const createOrder = createAsyncThunk('home/create', (order) => {});
