import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socketSource: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addEventSource: (state, action) => {
        state.socketSource = action.payload;
    }
  },
});

export const {
    addEventSource,
} = globalSlice.actions;

export default globalSlice.reducer;
