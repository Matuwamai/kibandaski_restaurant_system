import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  paymentStatusInfo: null,
  transactionInfo: localStorage.getItem('paymentInfo') ? JSON.parse(localStorage.getItem('paymentInfo')) : null,
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
    setTransactionInfo: (state, action) => {
      state.transactionInfo = action.payload;
      localStorage.setItem('paymentInfo', JSON.stringify(state.transactionInfo));
    },
    resetTransactionInfo: (state) => {
      state.transactionInfo = null;
      localStorage.removeItem('paymentInfo');
    }
  },
});

export const {
  initiateSTKStart,
  initiateSTKSuccess,
  initiateSTKFail,
  hidePaymentStatusInfo,
  setTransactionInfo,
  resetTransactionInfo
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
