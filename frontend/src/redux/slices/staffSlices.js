import { createSlice } from "@reduxjs/toolkit";

export const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffList: [],
    loading: false,
    error: null,
    created: false,
    staffDetails: null,
    updated: false,
    flag_delete: false,
    staff_flagged: null,
    deleted: false,
  },
  reducers: {
    getStaffListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStaffListSuccess: (state, action) => {
      state.loading = false;
      state.staffList = action.payload;
    },
    getStaffListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createStaffStart: (state) => {
      state.loading = true;
      state.error = null;
      state.created = false;
    },
    createStaffSuccess: (state) => {
      state.loading = false;
      state.created = true;
    },
    createStaffFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getStaffDetailsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getStaffDetailsSuccess: (state, action) => {
      state.loading = false;
      state.staffDetails = action.payload;
    },
    getStaffDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStaffStart: (state) => {
      state.loading = false;
      state.error = false;
      state.updated = false;
    },
    updateStaffSuccess: (state) => {
      state.loading = false;
      state.updated = true;
    },
    updateStaffFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStaffStart: (state) => {
      state.loading = true;
      state.error = false;
      state.deleted = false;
    },
    deleteStaffSuccess: (state) => {
      state.loading = false;
      state.deleted = true;
    },
    deleteStaffFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    showAlert: (state, action) => {
      state.flag_delete = true;
      state.staff_flagged = action.payload;
    },
    hideAlert: (state) => {
      state.flag_delete = false;
      state.staff_flagged = null;
    },
  },
});

export const {
  getStaffListStart,
  getStaffListSuccess,
  getStaffListFail,
  createStaffStart,
  createStaffSuccess,
  createStaffFail,
  getStaffDetailsStart,
  getStaffDetailsSuccess,
  getStaffDetailsFail,
  updateStaffStart,
  updateStaffSuccess,
  updateStaffFail,
  deleteStaffStart,
  deleteStaffSuccess,
  deleteStaffFail,
  showAlert,
  hideAlert,
} = staffSlice.actions;
export default staffSlice.reducer;
