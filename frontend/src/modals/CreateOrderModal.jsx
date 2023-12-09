import React, { useState, useEffect } from "react";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalContext } from "../context/context";
import { createOrder } from "../redux/actions/orderActions";
import Loading from "../utils/Loading";
import Message from "../utils/Message";

export default function CreateOrderModal() {
  const dispatch = useDispatch();
  const { isOrderCreateModalOpen, closeOrderCreateModal } = useGlobalContext();
  const { mealsList } = useSelector((state) => state.meals);
  const { loading, error, success_create } = useSelector(
    (state) => state.orders
  );

  const [mealSearch, setMealSearch] = useState("");
  const [searchedMeals, setSearchedMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerName, setCustomerName] = useState("");

  const handleCloseModal = () => {
    closeOrderCreateModal();
    document.body.style.overflow = "auto";
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        order_items: selectedMeals,
        table_no: 0,
        payment_method: "CASH",
        customer_name: customerName,
      })
    );
  };

  const handleSelect = (id) => {
    const existingId = selectedMeals?.find((selectedId) => selectedId === id);
    if (existingId) {
      const newArray = selectedMeals.filter((prevId) => prevId !== id);
      setSelectedMeals(newArray);
    } else {
      setSelectedMeals([...selectedMeals, id]);
    }
  };

  useEffect(() => {
    if (mealsList) {
      const meals = mealsList?.filter((item) =>
        item.title?.startsWith(mealSearch)
      );
      setSearchedMeals(meals);
    }
  }, [mealsList, mealSearch]);

  useEffect(() => {
    const meals = mealsList?.filter((item) => selectedMeals?.includes(item.id));
    const sumAmount = meals
      .reduce((itemA, itemB) => itemA + itemB.price, 0)
      .toFixed(2);
    setTotalAmount(sumAmount);
  }, [mealsList, selectedMeals]);

  useEffect(() => {
    if (success_create) {
      setSelectedMeals([]);
      handleCloseModal();
    }
  }, [success_create]);

  return (
    <div>
      {isOrderCreateModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3 className='h3 text-gray-800 uppercase font-semibold my-2'>
              Create new Order
            </h3>
            {loading ? <Loading /> : error && <Message>{error}</Message>}
            <form onSubmit={handleCreateOrder}>
              <div className='mb-3 flex flex-col'>
                <label htmlFor='meals' className='my-1'>
                  Meal & Dishes
                </label>
                <input
                  type='text'
                  placeholder='search meal...'
                  id='meals'
                  className='border rounded focus:outline-none p-2'
                  onChange={(e) => setMealSearch(e.target.value)}
                />
                <section className='grid grid-cols-2'>
                  {searchedMeals?.slice(0, 7).map((item) => {
                    return (
                      <div
                        className='col-span-1 flex gap-2 items-center mt-3'
                        key={item?.id}
                        onClick={() => handleSelect(item?.id)}
                      >
                        <input
                          type='checkbox'
                          checked={selectedMeals.includes(item?.id)}
                          className='border rounded focus:outline-none p-2 w-4 h-4'
                        />
                        <h6>{item?.title}</h6>
                      </div>
                    );
                  })}
                </section>
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
                  value={totalAmount}
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
                  onChange={(e) => setCustomerName(e.target.value)}
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
