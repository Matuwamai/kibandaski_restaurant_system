import axios from "axios";
import {
  initiateSTKFail,
  initiateSTKStart,
  initiateSTKSuccess,
} from "../slices/paymentSlice";
import { BASE_URL } from "../../url";

export const initiateStkPush = (details) => async (dispatch) => {
  dispatch(initiateSTKStart());

  try {
    const { data } = await axios.post(`${BASE_URL}/mpesa/stk-push/`, details);
    let message = "";
    console.log(data);
    if (
      data.ResponseDescription === "Success. Request accepted for processing"
    ) {
      message = "Check your phone to complete the transaction...";
      dispatch(initiateSTKSuccess(message));
    }
  } catch (err) {
    console.log(err);
    dispatch(initiateSTKFail("An error occurred initiating the transaction!"));
  }
};
