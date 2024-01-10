import React, { useState } from "react";

const StaffForm = ({ type = "add" }) => {
  const [staffInfo, setStaffInfo] = useState({
    fullName: "",
    email: "",
    id_no: "",
    role: "",
    phone_no: "",
  });

  const handleInputChange = (e) => {
    setStaffInfo({ ...staffInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating new staff...");
    console.log(type);
    console.log(staffInfo);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3 flex flex-col'>
        <label htmlFor='meals' className='my-1'>
          Full Name
        </label>
        <input
          name='fullName'
          type='text'
          placeholder='John Doe'
          id='fullNames'
          onChange={handleInputChange}
          className='border rounded focus:outline-none p-2'
        />
      </div>
      <div className='mb-3 flex flex-col'>
        <label htmlFor='email' className='my-1'>
          Email
        </label>
        <input
          name='email'
          type='email'
          placeholder='johndoe@gmail.com'
          id='email'
          onChange={handleInputChange}
          className='border rounded focus:outline-none p-2'
        />
      </div>
      <div className='mb-3 flex flex-col'>
        <label htmlFor='id_no' className='my-1'>
          ID NO
        </label>
        <input
          type='number'
          placeholder='********'
          id='id_no'
          name='id_no'
          onChange={handleInputChange}
          className='border rounded focus:outline-none p-2'
        />
      </div>
      <div className='mb-3 flex flex-col'>
        <label htmlFor='phone_no' className='my-1'>
          Contact
        </label>
        <input
          type='number'
          placeholder='0* ** *** ***'
          id='phone_no'
          name='phone_no'
          onChange={handleInputChange}
          className='border rounded focus:outline-none p-2'
        />
      </div>
      <div className='flex items-center justify-between'>
        <button type='submit' className='bg-amber-400 text-white w-1/2'>
          Submit
        </button>
        {type === "add" && (
          <div className='bg-white rounded-sm mx-2 p-1'>
            <p className='text-xs text-blue-600'>
              Upon successful creation, an email will be sent to the staff with
              the initial password!
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default StaffForm;
