import { createSlice } from '@reduxjs/toolkit';
import { createDish } from './dishFormThunks';

export interface dishFormState {
  isCreating: boolean;
}

const initialState: dishFormState = {
  isCreating: false,
};

export const dishFormSlice = createSlice({
  name: 'dishForm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDish.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createDish.rejected, (state) => {
        state.isCreating = false;
      });
  },
});
