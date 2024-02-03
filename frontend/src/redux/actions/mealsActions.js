import { BASE_URL } from "../../url";
import {
  createMealStart,
  createMealSuccess,
  createMealFail,
  listMealsFail,
  listMealsStart,
  listMealsSuccess,
  deleteMealFail,
  deleteMealStart,
  deleteMealSuccess,
  updateMealStart,
  updateMealSuccess,
  updateMealFail,
} from "../slices/mealsSlices";
import axios from "axios";

//  CREATE MEAL
export const createMeal = (meal) => async (dispatch) => {
  try {
    dispatch(createMealStart());

    await axios.post(`${BASE_URL}/meals-and-dishes/create`, meal);

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

// UPDATE MEAL

export const updateMeal = (mealInfo, meal_id) => async (dispatch) => {
  try {
    dispatch(updateMealStart());

    await axios.put(`${BASE_URL}/meals-and-dishes/update/${meal_id}`, mealInfo);
    dispatch(updateMealSuccess());
  } catch (err) {
    dispatch(updateMealFail("Item not updated!"));
  }
};

// UPDATE MEAL STATUS

export const updateMealStatus = (meal_id) => async (dispatch) => {
  try {
    dispatch(updateMealStart());

    await axios.put(
      `${BASE_URL}/meals-and-dishes/update-meal-status/${meal_id}`
    );
    dispatch(updateMealSuccess());
  } catch (err) {
    dispatch(updateMealFail("Item status not updated!"));
  }
};

// DELETE MEAL

export const deleteMeal = () => async (dispatch, getState) => {
  dispatch(deleteMealStart());
  try {
    const {
      meals: { meal_flagged },
    } = getState();
    await axios.delete(`${BASE_URL}/meals-and-dishes/delete/${meal_flagged}`);
    dispatch(deleteMealSuccess());
  } catch (err) {
    dispatch(deleteMealFail("Item not deleted!"));
  }
};
