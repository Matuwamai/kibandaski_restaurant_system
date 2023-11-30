import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  ordersList: [],
  success_create: false,
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrderStart: (state) => {
      state.loading = true;
      state.error = false;
      state.success_create = false;
    },
    createOrderSuccess: (state) => {
      state.loading = false;
      state.success_create = true;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    listOrdersStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    listOrdersSuccess: (state, action) => {
      state.loading = false;
      state.ordersList = action.payload;
    },
    listOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createOrderStart,
  createOrderSuccess,
  createOrderFail,
  listOrdersStart,
  listOrdersSuccess,
  listOrdersFail,
} = ordersSlice.actions;

export default ordersSlice.reducer;
