import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tablesList: [],
  success_create: false,
  success_delete: false,
  error: null,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    createTableStart: (state) => {
      state.loading = true;
      state.error = false;
      state.success_create = false;
    },
    createTableSuccess: (state) => {
      state.loading = false;
      state.success_create = true;
    },
    createTableFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTableStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTableSuccess: (state) => {
      state.loading = false;
      state.success_delete = true;
    },
    deleteTableFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    listTablesStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    listTablesSuccess: (state, action) => {
      state.loading = false;
      state.tablesList = action.payload;
    },
    listTablesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createTableStart,
  createTableSuccess,
  createTableFail,
  deleteTableStart,
  deleteTableSuccess,
  deleteTableFail,
  listTablesStart,
  listTablesSuccess,
  listTablesFail,
} = tablesSlice.actions;

export default tablesSlice.reducer;
