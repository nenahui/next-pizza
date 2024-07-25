import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { ApiDish } from '../../types';

export const createDish = createAsyncThunk<void, ApiDish, { state: RootState }>(
  'dishForm/create',
  async (dish) => {
    await axiosApi.post('pizzeria.json', dish);
  }
);
