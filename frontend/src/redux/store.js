import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./slices/mealsSlices";
import orderReducers from "./slices/orderSlices";
import tablesReducers from "./slices/tableSlices";

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    orders: orderReducers,
    tables: tablesReducers,
  },
});
