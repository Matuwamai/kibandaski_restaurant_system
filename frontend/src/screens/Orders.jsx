import React, { useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { MdAddShoppingCart } from "react-icons/md";
import OrdersTable from "../orders/OrdersTable";
import { useGlobalContext } from "../context/context";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../redux/actions/orderActions";
import Loading from "../utils/Loading";
import Message from "../utils/Message";

const Orders = () => {
  const dispatch = useDispatch();
  const { openOrderCreateModal } = useGlobalContext();

  const { loading, ordersList, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-3 my-3'>
        <div className='col-span-1 flex items-center'>
          <h3 className='text-gray-800 font-semibold text-xl uppercase my-auto'>
            Orders
          </h3>
        </div>
        <div className='col-span-1 lg:col-span-2'>
          <div className='w-full grid lg:grid-cols-2'>
            <div className='col-span-1 mt-2 lg:mt-0 lg:px-2 mb-2 lg:mb-0 flex gap-1'>
              <input
                type='text'
                className='w-4/5 border focus:outline-none px-2 py-1 rounded text-md'
                placeholder='Type Order No or Customer...'
              />
              <button className='border rounded bg-amber-400 w-1/5'>
                <SearchOutlinedIcon />
              </button>
            </div>
            <div className='col-span-1 mt-2 md:mt-0 flex gap-3 justify-center items-center'>
              <select className='w-1/2 focus:outline-none py-2 border rounded text-center bg-amber-100'>
                <option>-- select status --</option>
                <option>All</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
              <button
                className='w-1/2 flex gap-2 items-center justify-center bg-amber-400'
                onClick={openOrderCreateModal}
              >
                <MdAddShoppingCart style={{ fontSize: "18px" }} />
                Add Order
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? <Loading /> : error && <Message>{error}</Message>}
      <OrdersTable list={ordersList} />
    </div>
  );
};

export default Orders;
