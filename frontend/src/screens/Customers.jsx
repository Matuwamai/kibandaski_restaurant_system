import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CustomersList from "../customers/CustomersList";

const Customers = () => {
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 my-3'>
        <div className='col-span-1 flex items-center'>
          <h3 className='text-gray-800 font-semibold text-xl uppercase my-auto'>
            Customers
          </h3>
        </div>
        <div className='col-span-1'>
          <div className='w-full'>
            <div className='col-span-1 lg:col-span-3 mt-2 lg:mt-0 lg:px-2 mb-2 lg:mb-0 flex gap-1'>
              <input
                type='text'
                className='w-4/5 border focus:outline-none px-2 py-1 rounded text-md'
                placeholder='Search Staff Name...'
              />
              <button className='border rounded bg-amber-400 w-1/5 text-white'>
                <SearchOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 bg-white'>
        <div className='col-span-1 border my-1 lg:my-0 md:mx-1 shadow rounded flex justify-center gap-3 p-4'>
          <div className='w-20 h-20 rounded flex items-center justify-center bg-slate-100 text-3xl'>
            <PeopleAltOutlinedIcon
              className='text-amber-400'
              style={{ fontSize: "40px" }}
            />
          </div>
          <div className=''>
            <div className='text-green-500 flex gap-1 items-center text-md'>
              <ArrowUpwardOutlinedIcon style={{ fontSize: "20px" }} />
              <p className='text-sm'>7.5 % compared to yesterday</p>
            </div>
            <div className='text-red-500 mt-3 flex gap-1 items-center text-md'>
              <ArrowDownwardOutlinedIcon style={{ fontSize: "20px" }} />
              <p className='text-sm'>2.5 % compared to last month</p>
            </div>
            <div className='my-1 flex items-center justify-between'>
              <h6 className='my-auto text-gray-700 font-semibold'>
                30 Customers
              </h6>
            </div>
          </div>
        </div>
        <div className='col-span-1 border my-1 lg:my-0 md:mx-1 shadow rounded flex gap-3 justify-center items-center'>
          <div className='flex flex-col items-center justify-center'>
            <div className='w-16 h-16 rounded-full flex items-center justify-center bg-slate-100'>
              <h4 className='text-amber-400' style={{ fontSize: "18px" }}>
                4000+
              </h4>
            </div>
            <h6 className='text-gray-700 font-semibold'>Reedemed Points</h6>
          </div>
        </div>
      </div>
      <div className='bg-slate-50 py-4 mt-3'>
        <h3 className='text-gray-800 font-semibold text-xl capitalize mb-3'>
          Registered Customers
        </h3>
        <CustomersList />
        <div className='flex justify-start'></div>
      </div>
    </>
  );
};

export default Customers;
