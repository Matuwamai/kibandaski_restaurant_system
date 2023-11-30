import { BASE_URL } from "../../url";
import {
  createMealStart,
  createMealSuccess,
  createMealFail,
  listMealsFail,
  listMealsStart,
  listMealsSuccess,
} from "../slices/mealsSlices";
import axios from "axios";

//  CREATE MEAL
export const createMeal = (meal) => async (dispatch) => {
  try {
    dispatch(createMealStart());

    const { data } = await axios.post(
      `${BASE_URL}/meals-and-dishes/create`,
      meal
    );

    dispatch(createMealSuccess());
  } catch (err) {
    dispatch(createMealFail("Something went wrong!"));
  }
};

//  LIST ALL MEALS & DISHES

export const listMeals = () => async (dispatch) => {
  try {
    dispatch(listMealsStart());

    const { data } = await axios.get(`${BASE_URL}/meals-and-dishes/list`);
    dispatch(listMealsSuccess(data));
  } catch (err) {
    dispatch(listMealsFail("Error listing meals!"));
  }
};
