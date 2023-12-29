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
  const [cartItems, setCartItems] = useState([]);

  const handleCloseModal = () => {
    setSelectedMeals([]);
    setCartItems([]);
    closeOrderCreateModal();
    document.body.style.overflow = "auto";
  };

  const handleCartQty = (id, qty, type) => {
    let newCartItems = [];
    let newItem = {};
    const existingItem = cartItems?.find((item) => item.id === id);
    if (type === "dec") {
      if (qty === 1) {
        newCartItems = cartItems?.filter((item) => item.id !== id);
        setCartItems(newCartItems);
        const newArray = selectedMeals.filter((prevId) => prevId !== id);
        setSelectedMeals(newArray);
        return;
      } else {
        newItem = { ...existingItem, quantity: existingItem?.quantity - 1 };
      }
    } else if (type === "inc") {
      newItem = { ...existingItem, quantity: existingItem?.quantity + 1 };
    }
    newCartItems = cartItems?.map((item) => (item.id === id ? newItem : item));
    setCartItems(newCartItems);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        order_items: cartItems,
        payment_method: "CASH",
        customer_name: customerName,
        table_no: 10,
        amount: totalAmount,
      })
    );
  };

  const handleSelect = (id) => {
    const existingId = selectedMeals?.find((selectedId) => selectedId === id);
    if (existingId) {
      const newArray = selectedMeals.filter((prevId) => prevId !== id);
      setSelectedMeals(newArray);
      const newCartItems = cartItems?.filter((item) => item.id !== id);
      setCartItems(newCartItems);
    } else {
      setSelectedMeals([...selectedMeals, id]);
      const mealItem = mealsList?.find((item) => item.id === id);
      const newItem = { ...mealItem, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  };

  function getItemTotals(a, b) {
    const sum = a * b;
    return sum.toFixed(2);
  }

  useEffect(() => {
    if (mealsList) {
      const meals = mealsList?.filter((item) =>
        item.title?.startsWith(mealSearch)
      );
      setSearchedMeals(meals);
    }
  }, [mealsList, mealSearch]);

  useEffect(() => {
    if (success_create) {
      setSelectedMeals([]);
      handleCloseModal();
    }
  }, [success_create]);

  useEffect(() => {
    const totals = cartItems
      .reduce((itemA, itemB) => itemA + itemB?.quantity * itemB.price, 0)
      .toFixed(2);
    setTotalAmount(totals);
  }, [cartItems]);

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
                <table className='mt-2'>
                  <thead>
                    <tr className='bg-gray-100'>
                      <th className='py-2 px-2 text-left'>Item</th>
                      <th className='py-2 px-2 text-center'>Qty</th>
                      <th className='py-2 px-2 text-left'>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((item, index) => {
                      return (
                        <tr
                          className={index % 2 === 0 ? "bg-gray-50" : ""}
                          key={item?.id}
                        >
                          <td className='py-2 px-2 text-sm'>{item?.title}</td>
                          <td className='py-2 px-2 flex gap-2 justify-center items-center'>
                            <button
                              className='w-8 h-8 flex justify-center items-center border bg-slate-100 text-gray-700'
                              type='button'
                              onClick={() =>
                                handleCartQty(item?.id, item?.quantity, "dec")
                              }
                            >
                              -
                            </button>
                            <p className='text-sm'>{item?.quantity}</p>
                            <button
                              className='w-8 h-8 flex justify-center items-center border bg-slate-100 text-gray-700'
                              type='button'
                              onClick={() =>
                                handleCartQty(item?.id, item?.quantity, "inc")
                              }
                            >
                              +
                            </button>
                          </td>
                          <td className='py-2 px-2'>
                            {getItemTotals(item?.quantity, item?.price)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className='mb-3 flex flex-col'>
                <label htmlFor='amount' className='my-1'>
                  Cash Amount
                </label>
                <div className='border rounded focus:outline-none py-2 px-2 bg-gray-50 cursor-not-allowed'>
                  {totalAmount}
                </div>
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
