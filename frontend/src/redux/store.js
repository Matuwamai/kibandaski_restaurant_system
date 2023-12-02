import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./slices/mealsSlices";
import orderReducers from "./slices/orderSlices";
import tablesReducers from "./slices/tableSlices";
import userReducers from "./slices/userSlices";

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    orders: orderReducers,
    tables: tablesReducers,
    user: userReducers,
  },
});
