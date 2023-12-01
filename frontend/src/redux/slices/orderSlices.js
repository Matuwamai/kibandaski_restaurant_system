import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  ordersList: [],
  success_create: false,
  success_delete: false,
  success_update: false,
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
    deleteOrderStart: (state) => {
      state.loading = true;
      state.error = false;
      state.success_delete = false;
    },
    deleteOrderSuccess: (state) => {
      state.loading = false;
      state.success_delete = true;
    },
    deleteOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStart: (state) => {
      state.loading = true;
      state.error = false;
      state.success_update = false;
    },
    updateOrderSuccess: (state) => {
      state.loading = false;
      state.success_update = true;
    },
    updateOrderFail: (state, action) => {
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
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFail,
} = ordersSlice.actions;

export default ordersSlice.reducer;
