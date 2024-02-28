import axios from "axios";
import {
  initiateSTKFail,
  initiateSTKStart,
  initiateSTKSuccess,
} from "../slices/paymentSlice";
import { BASE_URL } from "../../url";
import { jwtDecode } from "jwt-decode";

export const initiateStkPush = (orderId, details) => async (dispatch, getState) => {
  dispatch(initiateSTKStart());

  try {
    const {user: {userInfo: {access}}} = getState();
    const decodedUser = jwtDecode(access);
    const { data } = await axios.post(`${BASE_URL}/mpesa/stk-push/${orderId}/${decodedUser?.id}`, details);
    let message = "";
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

const mpesaData = {
  Body: {
    stkCallback: {
      MerchantRequestID: "12345-67890-12345",
      CheckoutRequestID: "abcdefghijklmnopqrstuvwxyz",
      ResultCode: 0,
      ResultDesc: "The service was accepted successfully",
      CallbackMetadata: {
        Item: [
          {
            Name: "Amount",
            Value: 100,
          },
          {
            Name: "MpesaReceiptNumber",
            Value: "ABCDEFGHIJ",
          },
          {
            Name: "Balance",
            Value: 0,
          },
          {
            Name: "TransactionDate",
            Value: "2023-04-26 12:30:00",
          },
          {
            Name: "PhoneNumber",
            Value: "254712345678",
          },
        ],
      },
    },
  },
};

export const testCallBack = () => async (dispatch, getState) => {
  try {
    console.log("Testing callback...");
    const {user: {userInfo: {access}}} = getState();
    const decoded = jwtDecode(access);
    await axios.post(
      `${BASE_URL}/mpesa/mpesa-callback/${decoded.id}/`,
      mpesaData
    );
  } catch (err) {
    console.log(err);
  }
};
