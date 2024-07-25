import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { ApiDish, Dish } from '../../types';

export const createDish = createAsyncThunk<void, ApiDish, { state: RootState }>(
  'dishForm/create',
  async (dish) => {
    await axiosApi.post('pizzeria.json', dish);
  }
);

export const deleteDish = createAsyncThunk<void, string, { state: RootState }>(
  'dishForm/delete',
  async (dishId) => {
    await axiosApi.delete(`pizzeria/${dishId}.json`);
  }
);

export const editDish = createAsyncThunk<void, Dish, { state: RootState }>(
  'dishForm/edit',
  async (dish) => {
    await axiosApi.put(`pizzeria/${dish.id}.json`, dish);
  }
);

export const getDishValues = createAsyncThunk<ApiDish | null, string, { state: RootState }>(
  'dishForm/fetch',
  async (dishId) => {
    const { data: dish } = await axiosApi.get<ApiDish | null>(`pizzeria/${dishId}.json`);

    if (dish === null) {
      return null;
    }

    return dish;
  }
);
