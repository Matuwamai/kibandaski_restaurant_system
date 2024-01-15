import {
  getStaffListStart,
  getStaffListSuccess,
  getStaffListFail,
} from "../slices/staffSlices";
import axios from "axios";
import { BASE_URL } from "../../url";

export const listStaff = () => async (dispatch) => {
  dispatch(getStaffListStart());
  try {
    const { data } = await axios.get(`${BASE_URL}/users/staff/`);
    dispatch(getStaffListSuccess(data));
  } catch (err) {
    dispatch(getStaffListFail("Error listing staff"));
  }
};
