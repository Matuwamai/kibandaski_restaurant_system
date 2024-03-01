import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  paymentStatusInfo: null,
  transactionInfo: localStorage.getItem('paymentInfo') ? JSON.parse(localStorage.getItem('paymentInfo')) : null,
  transactionErr: localStorage.getItem('t_err') ? JSON.parse(localStorage.getItem('t_err')) : null,
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
