import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartDish, Dish } from '../../types';
import { fetchDishes } from './homeThunks';

export interface homeState {
  dishes: Dish[];
  cart: CartDish[];
  totalPrice: number;
  isFetching: boolean;
}

const initialState: homeState = {
  dishes: [],
  cart: [],
  totalPrice: 0,
  isFetching: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addToCart: (state, { payload: dish }: PayloadAction<Dish>) => {
      const index = state.cart.findIndex((cartDish) => cartDish.dish.id === dish.id);

      if (index !== -1) {
        state.cart[index].amount++;
      } else {
        state.cart.push({
          amount: 1,
          dish,
        });
      }

      state.totalPrice += dish.price;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const dishIndex = state.cart.findIndex((dish) => dish.dish.id === action.payload);
      if (dishIndex !== -1) {
        state.totalPrice -= state.cart[dishIndex].dish.price;
        state.cart.splice(dishIndex, 1);
      }
    },
  },
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
    selectTotalPrice: (state) => state.totalPrice,
    selectCart: (state) => state.cart,
  },
});

export const { selectIsFetching, selectIsDishes, selectTotalPrice, selectCart } =
  homeSlice.selectors;
export const { addToCart, removeFromCart } = homeSlice.actions;
export default homeSlice.reducer;
