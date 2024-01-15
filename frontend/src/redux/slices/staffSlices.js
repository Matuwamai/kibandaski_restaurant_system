import { createSlice } from "@reduxjs/toolkit";

export const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffList: [],
    loading: false,
    error: null,
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
  },
});

export const { getStaffListStart, getStaffListSuccess, getStaffListFail } =
  staffSlice.actions;
export default staffSlice.reducer;
