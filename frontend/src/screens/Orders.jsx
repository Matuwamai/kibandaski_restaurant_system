import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { MdAddShoppingCart } from "react-icons/md";
import OrdersTable from "../orders/OrdersTable";
import { useGlobalContext } from "../context/context";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../redux/actions/orderActions";
import { listMeals } from "../redux/actions/mealsActions";
import Pagination from "../pagination/Pagination";
import { useParams } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const { openOrderCreateModal } = useGlobalContext();

  const params = useParams();
  const pageNo = params.pageNo ? Number(params.pageNo) : 1;

  const {
    ordersList,
    reload,
    new_orders,
    success_delete,
    success_create,
    success_update,
  } = useSelector((state) => state.orders);

  const [searchId, setSearchId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSearchOrder = (e) => {
    e.preventDefault();
    dispatch(listOrders(pageNo, searchId));
  };

  const handleOrderStatusFilter = (e) => {
    setPaymentStatus(null);
    setOrderStatus(e.target.value);
  };

  const handlePaymentStatusFilter = (e) => {
    setOrderStatus(null);
    setPaymentStatus(e.target.value);
  };

  useEffect(() => {
    if (orderStatus !== null) {
      dispatch(listOrders(pageNo, searchId, orderStatus));
    }
  }, [dispatch, orderStatus, searchId, pageNo]);

  useEffect(() => {
    if (paymentStatus !== null) {
      dispatch(listOrders(pageNo, searchId, orderStatus, paymentStatus));
    }
  }, [dispatch, orderStatus, searchId, pageNo, paymentStatus]);

  useEffect(() => {
    dispatch(listOrders(pageNo));
  }, [dispatch, success_delete, success_create, success_update, pageNo]);

  useEffect(() => {
    if (reload) {
      dispatch(listOrders());
    }
  }, [dispatch, reload, new_orders]);

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);
  return (
    <div className=''>
      <div className='grid grid-cols-1 lg:grid-cols-3 my-3'>
        <div className='col-span-1 flex items-center'>
          <h3 className='text-gray-800 font-semibold text-xl uppercase my-auto'>
            Orders
          </h3>
        </div>
        <div className='col-span-1 lg:col-span-2'>
          <div className='w-full grid lg:grid-cols-2'>
            <form
              className='col-span-1 mt-2 lg:mt-0 lg:px-2 mb-2 lg:mb-0 flex gap-1'
              onSubmit={handleSearchOrder}
            >
              <input
                type='text'
                className='w-4/5 border focus:outline-none px-2 py-1 rounded text-md'
                placeholder='Type Order No without "ORD#"'
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                type='submit'
                className='border rounded bg-amber-400 w-1/5 text-white'
              >
                <SearchOutlinedIcon />
              </button>
            </form>
            <div className='col-span-1 mt-2 md:mt-0 flex gap-3 justify-center items-center'>
              {/* Filter by order status */}
              <select
                className='w-1/2 focus:outline-none py-2 border rounded text-center bg-amber-100'
                onChange={handleOrderStatusFilter}
              >
                <option>-- select order status --</option>
                <option value={null}>All</option>
                <option value={false}>Pending</option>
                <option value={true}>Completed</option>
              </select>
              {/* Filter by payment status */}
              <select
                className='w-1/2 focus:outline-none py-2 border rounded text-center bg-amber-100'
                onChange={handlePaymentStatusFilter}
              >
                <option>-- select payment status --</option>
                <option value={null}>All</option>
                <option value={false}>Pending</option>
                <option value={true}>Completed</option>
              </select>
              <button
                className='w-1/2 flex gap-3 items-center justify-center bg-amber-400 text-white'
                onClick={openOrderCreateModal}
              >
                <MdAddShoppingCart style={{ fontSize: "18px" }} />
                New
              </button>
            </div>
          </div>
        </div>
      </div>
      <OrdersTable list={ordersList?.orders} />
      {ordersList?.current_page && (
        <Pagination
          rootPath='/orders'
          pages={ordersList?.total_pages}
          currentPage={ordersList?.current_page}
        />
      )}
    </div>
  );
};

export default Orders;
