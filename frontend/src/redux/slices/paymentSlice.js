import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  paymentStatusInfo: null,
  transactionInfo: localStorage.getItem('paymentInfo') ? JSON.parse(localStorage.getItem('paymentInfo')) : null,
  transactionErr: localStorage.getItem('t_err') ? JSON.parse(localStorage.getItem('t_err')) : null,
  error: null,
  completTransactions: [],
  cancelledTransactions: [],
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
      if (action.payload?.type === "incomplete_transaction"){
        state.transactionErr = action.payload?.response;
        localStorage.setItem(
          "t_err",
          JSON.stringify(state.transactionInfo)
        );
      }
        state.transactionInfo = action.payload;
      localStorage.setItem('paymentInfo', JSON.stringify(state.transactionInfo));
    },
    resetTransactionInfo: (state) => {
      state.transactionInfo = null;
      localStorage.removeItem('paymentInfo');
      state.transactionErr = null;
      localStorage.removeItem("t_err");
    },
    getCompleteTransactionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCompleteTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.completTransactions = action.payload;
    },
    getCompleteTransactionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCancelledTransactionsStart: (state) => {
      state.loading = false;
      state.error = null;
    },
    getCancelledTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.cancelledTransactions = action.payload;
    },
    getCancelledTransactionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  initiateSTKStart,
  initiateSTKSuccess,
  initiateSTKFail,
  hidePaymentStatusInfo,
  setTransactionInfo,
  resetTransactionInfo,
  getCompleteTransactionsStart,
  getCompleteTransactionsSuccess,
  getCompleteTransactionsFail,
  getCancelledTransactionsStart,
  getCancelledTransactionsSuccess,
  getCancelledTransactionsFail,
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
