import React from "react";
import "./Modal.css";
import { useGlobalContext } from "../context/context";

export default function CreateOrderModal() {
  const { isOrderCreateModalOpen, closeOrderCreateModal } = useGlobalContext();

  const handleCloseModal = () => {
    closeOrderCreateModal();
    document.body.style.overflow = "auto";
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {isOrderCreateModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3 className='h3 text-gray-800 uppercase font-semibold my-2'>
              Create new Order
            </h3>
            <form onSubmit={handleCreateOrder}>
              <div className='mb-3 flex flex-col'>
                <label htmlFor='meals' className='my-1'>
                  Meal & Dishes
                </label>
                <select
                  className='border focus:outline-none p-2 text-center bg-slate-100 rounded text-gray-700'
                  id='meals'
                >
                  <option>Chapati Mix - Sukuma/Maharagwe</option>
                  <option>Ugali Mix - Supu ya Matumbo</option>
                </select>
              </div>
              <div className='mb-3 flex flex-col'>
                <label htmlFor='amount' className='my-1'>
                  Cash Amount
                </label>
                <input
                  type='number'
                  placeholder='100'
                  id='amount'
                  className='border rounded focus:outline-none p-2'
                />
              </div>
              <div className='mb-3 flex flex-col'>
                <label htmlFor='name' className='my-1'>
                  Customer Name
                </label>
                <input
                  type='text'
                  placeholder='Customer Name'
                  id='name'
                  className='border rounded focus:outline-none p-2'
                />
              </div>
              <div className='mb-3 flex flex-col'>
                <label htmlFor='amount' className='my-1'>
                  Table No
                </label>
                <input
                  type='text'
                  placeholder='Table No'
                  className='border rounded focus:outline-none p-2'
                />
              </div>
              <div className='flex items-center justify-between'>
                <button className='btn-close' onClick={handleCloseModal}>
                  Close
                </button>
                <button type='submit' className='bg-amber-400 text-white h-10'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
