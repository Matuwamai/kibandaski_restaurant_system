import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  paymentStatusInfo: null,
  error: null,
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    initiateSTKStart: (state) => {
      state.loading = true;
      state.error = false;
      state.paymentStatusInfo = null;
    },
    initiateSTKSuccess: (state, action) => {
      state.loading = false;
      state.paymentStatusInfo = action.payload;
    },
    initiateSTKFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    hidePaymentStatusInfo: (state) => {
      state.paymentStatusInfo = null;
    },
  },
});

export const {
  initiateSTKStart,
  initiateSTKSuccess,
  initiateSTKFail,
  hidePaymentStatusInfo,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
