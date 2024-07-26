import { createSlice } from '@reduxjs/toolkit';
import type { Order } from '../../types';
import { fetchOrders } from './ordersThunks';

export interface orderState {
  orders: Order[][];
  isFetching: boolean;
}

const initialState: orderState = {
  orders: [],
  isFetching: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchOrders.fulfilled, (state, { payload: Orders }) => {
        state.orders = Orders;
        state.isFetching = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectIsFetching: (state) => state.isFetching,
    selectOrders: (state) => state.orders,
  },
});

export const { selectOrders, selectIsFetching } = ordersSlice.selectors;
