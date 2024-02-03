import {
  deleteCustomerFail,
  deleteCustomerStart,
  deleteCustomerSuccess,
  loginFail,
  loginStart,
  loginSuccess,
  logoutUser,
  registerFail,
  registerStart,
  registerSuccess,
} from "../slices/userSlices";
import axios from "axios";
import { BASE_URL } from "../../url";

export const register = (details) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const { data } = await axios.post(`${BASE_URL}/users/register`, details);
    dispatch(registerSuccess(data));
  } catch (err) {
    dispatch(
      registerFail(err.response ? err.response.data.message : err.message)
    );
  }
};

export const deleteCustomer = () => async (dispatch, getState) => {
  dispatch(deleteCustomerStart());
  try {
    const {
      user: { customer_flagged },
    } = getState();
    await axios.delete(`${BASE_URL}/users/${customer_flagged}/delete/`);
    dispatch(deleteCustomerSuccess());
  } catch (err) {
    dispatch(
      deleteCustomerFail(err.response ? err.response.data.message : err.message)
    );
  }
};

export const login = (details) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { data } = await axios.post(`${BASE_URL}/users/login`, details);
    dispatch(loginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch(loginFail("Invalid credentials!"));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(logoutUser());
};
