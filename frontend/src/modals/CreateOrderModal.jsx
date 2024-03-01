import React, { useState, useEffect } from "react";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalContext } from "../context/context";
import { createOrder } from "../redux/actions/orderActions";
import Loading from "../utils/Loading";
import Message from "../utils/Message";
import { initiateStkPush, testCallBack } from "../redux/actions/paymentActions";
import { hidePaymentStatusInfo } from "../redux/slices/paymentSlice";
import { useNavigate } from "react-router";

export default function CreateOrderModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOrderCreateModalOpen, closeOrderCreateModal } = useGlobalContext();
  const { mealsList } = useSelector((state) => state.meals);
  const { loading, error, success_create, orderDetails } = useSelector(
    (state) => state.orders
  );
  const {
    loading: loadingPayment,
    error: errorPayment,
    paymentStatusInfo,
    transactionInfo,
    transactionErr,
  } = useSelector((state) => state.payments);

  const [mealSearch, setMealSearch] = useState("");
  const [searchedMeals, setSearchedMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("CASH");

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCloseModal = () => {
    setSelectedMeals([]);
    setCartItems([]);
    dispatch(hidePaymentStatusInfo());
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
        payment_method: paymentMethod,
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
    if (success_create && paymentMethod === "MPESA"){
      dispatch(initiateStkPush(orderDetails?.id, { phone, amount: Math.round(totalAmount) }));
    }else if (success_create && paymentMethod === "CASH") {
      setSelectedMeals([]);
      handleCloseModal();
    }
  }, [success_create, dispatch, paymentMethod]);

  useEffect(() => {
    const totals = cartItems
      .reduce((itemA, itemB) => itemA + itemB?.quantity * itemB.price, 0)
      .toFixed(2);
    setTotalAmount(totals);
  }, [cartItems]);

  useEffect(() => {
    if (transactionInfo || transactionErr) {
      dispatch(hidePaymentStatusInfo());
      navigate(
        `/orders/1/payments/${transactionInfo?.ReceiptNumber}/validation`
      );
    }
  }, [transactionInfo, transactionErr, dispatch, navigate]);

  return (
    <div>
      {isOrderCreateModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content order-content'>
            <h3 className='h3 text-gray-800 uppercase font-semibold my-2'>
              Create new Order
            </h3>
            {loading ? <Loading /> : error && <Message>{error}</Message>}
            {!loading && loadingPayment ? (
              <Loading />
            ) : (
              errorPayment && <Message>{errorPayment}</Message>
            )}
            {paymentStatusInfo && (
              <div className='bg-green-400 border border-white rounded w-full text-white text-center'>
                <p className='py-3'>{paymentStatusInfo}</p>
              </div>
            )}
            {transactionInfo && (
              <div className='bg-green-400 border border-white rounded w-full text-white text-center my-3'>
                <p className='py-3'>{transactionInfo.message}</p>
              </div>
            )}
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
                <section className='grid grid-cols-3'>
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
                <table className='w-full mt-2'>
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
                {cartItems.length === 0 && (
                  <div className='w-full mt-2'>
                    <div className='w-full bg-blue-100 text-blue-500 border border-white rounded text-center mx-auto'>
                      <p className='py-3'>No meal selected!</p>
                    </div>
                  </div>
                )}
              </div>
              <div className='w-full grid md:grid-cols-2'>
                <div className='mb-3'>
                  <label htmlFor='paymentMethod' className='my-1'>
                    Payment Method
                  </label>
                  <div className='flex items-center justify-between'>
                    <div className='mb-2 flex items-center'>
                      <input
                        type='radio'
                        id='mpesa'
                        name='paymentMethod'
                        value='MPESA'
                        className='h-6 w-6'
                        checked={paymentMethod === "MPESA"}
                        onChange={handlePaymentMethodChange}
                      />
                      <label htmlFor='mpesa' className='ml-2'>
                        <img
                          src='/assets/mpesa.png'
                          alt='mpesa'
                          className='w-30 h-16 img-contain my-auto'
                        />
                      </label>
                    </div>

                    <div className='mb-2 flex items-center'>
                      <input
                        type='radio'
                        id='cash'
                        name='paymentMethod'
                        value='CASH'
                        className='h-6 w-6'
                        checked={paymentMethod === "CASH"}
                        onChange={handlePaymentMethodChange}
                      />
                      <h6 className='ml-2 font-semibold text-xl uppercase my-auto'>
                        Cash
                      </h6>
                    </div>
                  </div>
                </div>
                <div className='col-span-1 md:mx-8 mb-3 flex flex-col'>
                  <label htmlFor='amount' className='my-1'>
                    Amount
                  </label>
                  <div className='col-span-1 border rounded focus:outline-none py-2 px-2 bg-gray-50 cursor-not-allowed'>
                    {totalAmount}
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
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
                {paymentMethod === "MPESA" && (
                  <div className='mb-3 flex flex-col'>
                    <label htmlFor='phone' className='my-1'>
                      Mpesa No
                    </label>
                    <input
                      type='number'
                      placeholder='2547********'
                      id='phone'
                      className='border rounded focus:outline-none p-2'
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                )}
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
