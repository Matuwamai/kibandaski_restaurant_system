import React from "react";
import "./Modal.css";
import { useGlobalContext } from "../context/context";

function OrderViewModal() {
  const { isOrderViewModalOpen, closeOrderViewModal } = useGlobalContext();

  const handleCloseModal = () => {
    closeOrderViewModal();
    document.body.style.overflow = "auto"; // Allow scrolling on the body
  };

  return (
    <div>
      {isOrderViewModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3 className='h3 text-success text-center'>Order View Modal</h3>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderViewModal;
