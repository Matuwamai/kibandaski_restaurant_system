import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
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
      state.success = false;
    },
    initiateSTKSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.paymentStatusInfo = action.payload;
    },
    initiateSTKFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { initiateSTKStart, initiateSTKSuccess, initiateSTKFail } =
  paymentsSlice.actions;

export default paymentsSlice.reducer;
