import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  mealsList: [],
  success_create: false,
  error: null,
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    createMealStart: (state) => {
      state.loading = true;
      state.error = false;
      state.success_create = false;
    },
    createMealSuccess: (state) => {
      state.loading = false;
      state.success_create = true;
    },
    createMealFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    listMealsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    listMealsSuccess: (state, action) => {
      state.loading = false;
      state.mealsList = action.payload;
    },
    listMealsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createMealStart,
  createMealSuccess,
  createMealFail,
  listMealsStart,
  listMealsSuccess,
  listMealsFail,
} = mealsSlice.actions;

export default mealsSlice.reducer;
