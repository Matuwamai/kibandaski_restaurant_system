import {
  getStaffListStart,
  getStaffListSuccess,
  getStaffListFail,
  createStaffStart,
  createStaffFail,
  createStaffSuccess,
} from "../slices/staffSlices";
import axios from "axios";
import { BASE_URL } from "../../url";

export const listStaff = () => async (dispatch) => {
  dispatch(getStaffListStart());
  try {
    const { data } = await axios.get(`${BASE_URL}/users/staff/`);
    dispatch(getStaffListSuccess(data));
  } catch (err) {
    dispatch(getStaffListFail("Error listing staff!"));
  }
};

export const createStaff = (staffInfo) => async (dispatch) => {
  dispatch(createStaffStart());
  try {
    await axios.post(`${BASE_URL}/users/staff/register/`, staffInfo);
    dispatch(createStaffSuccess());
  } catch (err) {
    dispatch(createStaffFail("Error adding new staff!"));
  }
};
