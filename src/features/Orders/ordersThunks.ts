import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { ApiDish, Order } from '../../types';

export const fetchOrders = createAsyncThunk<Order[][], void, { state: RootState }>(
  'orders/fetch',
  async () => {
    const { data: apiOrders } = await axiosApi.get<Order[] | null>('pizzeria/orders.json');

    if (apiOrders === null) {
      return [];
    }

    const orders = Object.keys(apiOrders).map((id) => ({
      id,
      ...apiOrders[id],
    }));

    return await Promise.all(
      orders.map(async (order) => {
        const keys = Object.keys(order).slice(1);
        const amount = Object.values(order).slice(1);

        const dishPromises = keys.map(async (dishId, index) => {
          const { data } = await axiosApi.get<ApiDish>(`pizzeria/dishes/${dishId}.json`);
          return { amount: amount[index], dish: data, orderId: keys[index] };
        });

        return await Promise.all(dishPromises);
      })
    );
  }
);

export const completeOrder = createAsyncThunk<void, string, { state: RootState }>(
  'orders/complete',
  async (orderId) => {
    await axiosApi.delete(`pizzeria/orders/${orderId}.json`);
  }
);
