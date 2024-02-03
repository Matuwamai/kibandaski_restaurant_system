import React from "react";
import "./alert.css";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../redux/slices/staffSlices";
import { deletStaff } from "../../redux/actions/staffActions";
import { deleteOrder } from "../../redux/actions/orderActions";
import { hideOrderDeleteAlert } from "../../redux/slices/orderSlices";
import { deleteMeal } from "../../redux/actions/mealsActions";
import { hideMealDeleteAlert } from "../../redux/slices/mealsSlices";
import { deleteCustomer } from "../../redux/actions/userActions";
import { hideCustomerDeleteAlert } from "../../redux/slices/userSlices";

const Alert = () => {
  const dispatch = useDispatch();
  const { flag_delete: user_flag } = useSelector((state) => state.staff);
  const { flag_delete: order_flag } = useSelector((state) => state.orders);
  const { flag_delete: meal_flag } = useSelector((state) => state.meals);
  const { flag_delete: customer_flag } = useSelector((state) => state.user);

  const handleConfirm = () => {
    if (user_flag) {
      dispatch(deletStaff());
      dispatch(hideAlert());
    } else if (order_flag) {
      dispatch(deleteOrder());
      dispatch(hideOrderDeleteAlert());
    } else if (meal_flag) {
      dispatch(deleteMeal());
      dispatch(hideMealDeleteAlert());
    } else if (customer_flag) {
      dispatch(deleteCustomer());
      dispatch(hideCustomerDeleteAlert());
    }
  };

  const handleClose = () => {
    if (user_flag) {
      dispatch(hideAlert());
    } else if (order_flag) {
      dispatch(hideOrderDeleteAlert());
    } else if (meal_flag) {
      dispatch(hideMealDeleteAlert());
    } else if (customer_flag) {
      dispatch(hideCustomerDeleteAlert());
    }
  };

  return (
    <div
      className={`alert-modal ${
        user_flag || order_flag || meal_flag || customer_flag ? "show" : "hide"
      }`}
    >
      <div className='alert-modal-content'>
        <span className='alert-close' onClick={handleClose}>
          &times;
        </span>
        <p className='px-3 text-gray-600 italic'>
          Your are about to perfom an action that can't be undone!
        </p>
        <div className='w-full flex justify-end mt-2'>
          <button className='btn bg-red-500 text-white' onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
