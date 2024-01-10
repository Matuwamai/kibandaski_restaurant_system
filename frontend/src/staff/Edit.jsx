import React from "react";
import { Link } from "react-router-dom";
import DashStats from "../analytics/DashStats";
import StaffForm from "./StaffForm";

const Edit = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-5'>
      <div className='col-span-1 md:col-span-3 bg-slate-100 p-4'>
        <div className='flex justify-between'>
          <h3 className='text-gray-800 font-semibold text-xl uppercase my-auto'>
            EDIT STAFF DETAILS
          </h3>
          <Link to='/staff'>
            <button className='col-span-1 mt-2 md:mt-0 flex gap-1 items-center justify-center bg-amber-400 text-white uppercase'>
              Back to Staff
            </button>
          </Link>
        </div>
        <StaffForm type='edit' />
      </div>
      <div className='col-span-1 md:col-span-2 mx-2'>
        <DashStats type='mini' />
      </div>
    </div>
  );
};

export default Edit;
