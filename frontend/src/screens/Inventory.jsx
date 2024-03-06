import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InventorySection from "../inventory/InventorySection";
import { GiMoneyStack } from "react-icons/gi";
import { FaSortAmountDown } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";

const Inventory = () => {
  return (
    <div className=''>
      <div className='grid grid-cols-1 md:grid-cols-3 my-3'>
        <div className='col-span-1 md:col-span-2 flex items-center'>
          <h3 className='text-gray-800 font-semibold text-xl uppercase my-auto'>
            Inventory (Stock Inventory)
          </h3>
        </div>
        <form className='col-span-1 mt-2 lg:mt-0 lg:px-2 mb-2 lg:mb-0 flex gap-1'>
          <input
            type='text'
            className='w-4/5 border focus:outline-none px-2 py-1 rounded text-md'
            placeholder='Search Item...'
          />
          <button
            type='submit'
            className='border rounded bg-amber-400 w-1/5 text-white'
          >
            <SearchOutlinedIcon />
          </button>
        </form>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-3 my-3'>
        <div className='col-span-1 rounded shadow p-4 bg-amber-300 flex gap-2 items-start text-green-800'>
          <GiMoneyStack style={{ fontSize: "34px" }} />
          <span>
            <h3 className='font-semibold text-2xl'>KES 30 000</h3>
            <p className='text-sm text-gray-600'>Stock Value</p>
          </span>
        </div>
        <div className='col-span-1 rounded shadow p-4 bg-slate-300 flex gap-2 items-start text-red-500'>
          <FaSortAmountDown style={{ fontSize: "34px" }} />
          <span>
            <h2 className='font-semibold text-2xl my-auto'>11</h2>
            <p className='text-sm'>Below Minimum Stock</p>
          </span>
        </div>
        <div className='col-span-1 rounded shadow p-4 bg-amber-600 flex gap-2 items-start text-white'>
          <BiCategory style={{ fontSize: "34px" }} />
          <span>
            <h2 className='font-semibold text-2xl my-auto'>50</h2>
            <p className='text-sm'>Total Items</p>
          </span>
        </div>
        <div className='col-span-1 rounded shadow p-4 bg-blue-300 flex gap-2 items-start text-white'>
          <MdOutlineCategory style={{ fontSize: "34px" }} />
          <span>
            <h2 className='font-semibold text-2xl my-auto'>10</h2>
            <p className='text-sm'>Total Categories</p>
          </span>
        </div>
      </div>
      <InventorySection />
    </div>
  );
};

export default Inventory;
