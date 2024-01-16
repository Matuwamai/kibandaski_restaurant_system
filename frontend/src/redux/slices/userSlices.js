import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: userInfoFromLocalStorage,
    loading: false,
    error: null,
    resetPass: false,
    updatePass: false,
    customersList: [],
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = {};
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordStart: (state) => {
      state.loading = true;
      state.error = false;
      state.resetPass = false;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.resetPass = true;
    },
    resetPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordStart: (state) => {
      state.loading = true;
      state.error = false;
      state.updatePass = false;
    },
    updatePasswordSuccess: (state) => {
      state.loading = false;
      state.updatePass = true;
    },
    updatePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCustomerListStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getCustomerListSuccess: (state, action) => {
      state.loading = false;
      state.customersList = action.payload;
    },
    getCustomerListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logoutUser,
  registerStart,
  registerSuccess,
  registerFail,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFail,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFail,
  getUsersStart,
  getUsersSuccess,
  getUsersFail,
  getCustomerListStart,
  getCustomerListSuccess,
  getCustomerListFail,
} = userSlice.actions;
export default userSlice.reducer;
