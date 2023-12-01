import { BASE_URL } from "../../url";
import {
  createOrderStart,
  createOrderSuccess,
  createOrderFail,
  listOrdersFail,
  listOrdersStart,
  listOrdersSuccess,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFail,
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

// DELETE ORDER

export const deleteOrder = (order_id) => async (dispatch) => {
  try {
    dispatch(deleteOrderStart());

    await axios.delete(`${BASE_URL}/orders/delete/${order_id}`);
    dispatch(deleteOrderSuccess());
  } catch (err) {
    dispatch(deleteOrderFail("Item not deleted!"));
  }
};
