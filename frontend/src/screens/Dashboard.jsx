import React, { useEffect } from "react";
import RevenueStats from "../analytics/RevenueStats";
import OrdersList from "../orders/OrdersList";
import DashStats from "../analytics/DashStats";
import { getOrderStats } from "../redux/actions/orderActions";
import { useDispatch} from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderStats());
  }, [dispatch]);
  return (
    <div className=''>
      <DashStats />
      <div className='grid grid-cols-1 lg:grid-cols-5 bg-slate-50 lg:mx-1 p-4 mt-3'>
        <div className='col-span-1 lg:col-span-3'>
          <h4 className='text-amber-600 font-semibold mb-3 text-xl ml-2'>
            Monthly Revenue Stats
          </h4>
          <RevenueStats />
        </div>
        <div className='col-span-1 lg:col-span-2'>
          <h4 className='text-amber-600 font-semibold mb-3 text-xl'>
            New Orders
          </h4>
          <OrdersList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
