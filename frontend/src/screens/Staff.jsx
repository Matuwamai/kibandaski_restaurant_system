import React from "react";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { IoIosAdd } from "react-icons/io";
import StaffList from "../staff/StaffList";

const Staff = () => {
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-3 my-3'>
        <div className='col-span-1 flex items-center'>
          <h3 className='text-gray-800 font-semibold text-xl uppercase my-auto'>
            Staff
          </h3>
        </div>
        <div className='col-span-1 lg:col-span-2'>
          <div className='w-full grid lg:grid-cols-4'>
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
            <button className='col-span-1 mt-2 md:mt-0 flex gap-1 items-center justify-center bg-amber-400 text-white'>
              <IoIosAdd style={{ fontSize: "28px" }} />
              Add Staff
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white'>
        <div className='col-span-1 border my-1 lg:my-0 md:mx-1 shadow rounded flex justify-center gap-3 p-4'>
          <div className='h-full py-4 flex flex-col justify-end items-center'>
            <img
              src='data:image/png;base64,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'
              alt='chef'
              className='w-20 h-20 rounded-full img-cover border'
            />
            <h6 className='text-gray-700 font-semibold'>5 Chefs & Cooks</h6>
          </div>
        </div>
        <div className='col-span-1 border my-1 lg:my-0 md:mx-1 shadow rounded flex gap-3 justify-center items-center'>
          <div className='flex flex-col items-center justify-center'>
            <div className='w-20 h-20 rounded-full flex items-center justify-center bg-slate-100'>
              <GroupAddOutlinedIcon
                className='text-amber-400'
                style={{ fontSize: "40px" }}
              />
            </div>
            <h6 className='text-gray-700 font-semibold'>15 Total Staff</h6>
          </div>
        </div>
        <div className='col-span-1 border my-1 lg:my-0 md:mx-1 shadow rounded flex justify-center gap-3 p-4'>
          <div className='h-full py-4 flex flex-col justify-end items-center'>
            <img
              src='data:image/jpeg;base64,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'
              alt='chef'
              className='w-20 h-20 rounded-full img-cover border'
            />
            <h6 className='text-gray-700 font-semibold'>10 Waiters</h6>
          </div>
        </div>
      </div>
      <div className='bg-slate-50 p-4 mt-3'>
        <StaffList />
        <div className='flex justify-start'></div>
      </div>
    </>
  );
};

export default Staff;
