import {
  getStaffListStart,
  getStaffListSuccess,
  getStaffListFail,
  createStaffStart,
  createStaffFail,
  createStaffSuccess,
  getStaffDetailsStart,
  getStaffDetailsFail,
  getStaffDetailsSuccess,
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

export const getStaffDetails = (staff_id) => async (dispatch) => {
  dispatch(getStaffDetailsStart());
  try {
    const { data } = await axios.get(`${BASE_URL}/users/staff/${staff_id}/`);
    dispatch(getStaffDetailsSuccess(data));
  } catch (err) {
    dispatch(getStaffDetailsFail("Error getting staff data!"));
  }
};
