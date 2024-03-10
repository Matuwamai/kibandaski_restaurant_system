import React from 'react'
import Purchases from '../inventory/Purchases'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from 'react-router-dom';
import Pagination from '../pagination/Pagination';

const Purchase = () => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 my-3'>
        <div className='col-span-1 md:col-span-1 flex items-center'>
          <h3 className='text-gray-800 font-semibold text-xl uppercase my-auto'>
            Purchases
          </h3>
        </div>
        <div className='col-span-1 md:col-span-2'>
          <div className='w-full grid grid-cols-3'>
            <form className='col-span-2 mt-2 lg:mt-0 lg:px-2 mb-2 lg:mb-0 flex gap-1'>
              <input
                type='text'
                className='w-4/5 border focus:outline-none px-2 py-1 rounded text-md'
                placeholder='Search Item using SKU'
              />
              <button
                type='submit'
                className='border rounded bg-amber-400 w-1/5 text-white'
              >
                <SearchOutlinedIcon />
              </button>
            </form>
            <Link
              to='/inventory'
              className='col-span-1 bg-amber-700 px-3 py-1 text-white rounded-none flex items-center justify-center'
            >
              Current Stock
            </Link>
          </div>
        </div>
      </div>
      <Purchases />
      <Pagination rootPath='/inventory/purchases' />
    </div>
  );
}

export default Purchase