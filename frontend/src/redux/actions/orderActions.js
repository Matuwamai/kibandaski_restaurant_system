import { BASE_URL } from "../../url";
import {
  createOrderStart,
  createOrderSuccess,
  createOrderFail,
  listOrdersFail,
  listOrdersStart,
  listOrdersSuccess,
} from "../slices/orderSlices";
import axios from "axios";

//  CREATE ORDER
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderStart());

    await axios.post(`${BASE_URL}/orders/create`, order);

    dispatch(createOrderSuccess());
  } catch (err) {
    dispatch(createOrderFail("Error creating order!"));
  }
};

//  LIST ALL ORDERS

export const listOrders = () => async (dispatch) => {
  try {
    dispatch(listOrdersStart());

    const { data } = await axios.get(`${BASE_URL}/orders/list`);
    dispatch(listOrdersSuccess(data));
  } catch (err) {
    dispatch(listOrdersFail("Error listing orders!"));
  }
};
