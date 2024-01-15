import React from "react";
import "./alert.css";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../redux/slices/staffSlices";
import { deletStaff } from "../../redux/actions/staffActions";

const Alert = () => {
  const dispatch = useDispatch();
  const { flag_delete } = useSelector((state) => state.staff);

  const handleConfirm = () => {
    dispatch(deletStaff());
    dispatch(hideAlert());
  };

  const handleClose = () => {
    dispatch(hideAlert());
  };

  return (
    <div className={`alert-modal ${flag_delete ? "show" : "hide"}`}>
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
