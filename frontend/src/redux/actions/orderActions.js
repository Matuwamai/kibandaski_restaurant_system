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
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFail,
  clearTable,
  orderStats,
} from "../slices/orderSlices";
import axios from "axios";

//  CREATE ORDER
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderStart());

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const {data} = await axios.post(`${BASE_URL}/orders/create`, order, config);

    dispatch(createOrderSuccess(data));
    dispatch(clearTable());
  } catch (err) {
    console.log(err);
    dispatch(
      createOrderFail(err.response ? err.response.data.message : err.message)
    );
  }
};

//  LIST ALL ORDERS

export const listOrders = (page=1, orderId="", orderStatus=null, paymentStatus=null) => async (dispatch) => {
  try {
    dispatch(listOrdersStart());

    const { data } = await axios.get(`${BASE_URL}/orders/list?pageNo=${page}&search_id=${orderId}&order_status=${orderStatus}&payment_status=${paymentStatus}`);
    dispatch(listOrdersSuccess(data));
  } catch (err) {
    dispatch(listOrdersFail("Error listing orders!"));
  }
};


export const getOrderStats = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders/stats`);
    dispatch(orderStats(data));
    console.log(data)
  } catch (err) {
    console.log(err)
  }
};

// UPDATE ORDER STATUS

export const updateOrderStatus = (order_id) => async (dispatch) => {
  try {
    dispatch(updateOrderStart());

    await axios.put(`${BASE_URL}/orders/edit-status/${order_id}`);
    dispatch(updateOrderSuccess());
  } catch (err) {
    console.log(err);
    dispatch(updateOrderFail("Order status not updated!"));
  }
};

// DELETE ORDER

export const deleteOrder = () => async (dispatch, getState) => {
  dispatch(deleteOrderStart());
  try {
    const {
      orders: { order_flagged },
    } = getState();

    await axios.delete(`${BASE_URL}/orders/delete/${order_flagged}`);
    dispatch(deleteOrderSuccess());
  } catch (err) {
    dispatch(deleteOrderFail("Item not deleted!"));
  }
};
