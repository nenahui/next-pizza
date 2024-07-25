import { createSlice } from '@reduxjs/toolkit';
import type { ApiDish } from '../../types';
import { createDish, editDish, getDishValues } from './dishFormThunks';

export interface dishFormState {
  isCreating: boolean;
  isEditing: boolean;
  isDishFetching: boolean;
  initialValues: ApiDish | null;
}

const initialState: dishFormState = {
  isCreating: false,
  isEditing: false,
  isDishFetching: false,
  initialValues: null,
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

    builder
      .addCase(editDish.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(editDish.fulfilled, (state) => {
        state.isEditing = false;
      })
      .addCase(editDish.rejected, (state) => {
        state.isEditing = false;
      });

    builder
      .addCase(getDishValues.pending, (state) => {
        state.initialValues = null;
        state.isDishFetching = true;
      })
      .addCase(getDishValues.fulfilled, (state, { payload: dishInfo }) => {
        state.initialValues = dishInfo;
        state.isDishFetching = false;
      })
      .addCase(getDishValues.rejected, (state) => {
        state.isDishFetching = false;
      });
  },
  selectors: {
    selectIsCreating: (state) => state.isCreating,
    selectIsEditing: (state) => state.isEditing,
    selectInitialValues: (state) => state.initialValues,
    selectIsDishFetching: (state) => state.isDishFetching,
  },
});

export const { selectIsCreating, selectIsEditing, selectInitialValues, selectIsDishFetching } =
  dishFormSlice.selectors;
