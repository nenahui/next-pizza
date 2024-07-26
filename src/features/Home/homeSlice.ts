import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartDish, Dish } from '../../types';
import { createOrder, fetchDishes } from './homeThunks';

export interface homeState {
  dishes: Dish[];
  cart: CartDish[];
  totalPrice: number;
  isFetching: boolean;
  isCreating: boolean;
}

const initialState: homeState = {
  dishes: [],
  cart: [],
  totalPrice: 0,
  isFetching: false,
  isCreating: false,
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
    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
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

    builder
      .addCase(createOrder.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isCreating = false;
        state.cart = [];
        state.totalPrice = 0;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectIsFetching: (state) => state.isFetching,
    selectIsDishes: (state) => state.dishes,
    selectTotalPrice: (state) => state.totalPrice,
    selectCart: (state) => state.cart,
    selectIsCreating: (state) => state.isCreating,
  },
});

export const { selectIsFetching, selectIsDishes, selectTotalPrice, selectCart, selectIsCreating } =
  homeSlice.selectors;
export const { addToCart, removeFromCart, clearCart } = homeSlice.actions;
export default homeSlice.reducer;
