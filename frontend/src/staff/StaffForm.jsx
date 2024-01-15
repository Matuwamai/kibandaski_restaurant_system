import React, { useState } from "react";

const StaffForm = ({ type = "add" }) => {
  const [staffInfo, setStaffInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    id_no: "",
    role: "",
    contact: "",
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
      <div className='mb-3 flex flex-wrap justify-between'>
        <div className='flex flex-col'>
          <label htmlFor='first_name' className='my-1'>
            First Name
          </label>
          <input
            name='first_name'
            type='text'
            placeholder='John'
            id='first_name'
            onChange={handleInputChange}
            className='border rounded focus:outline-none p-2'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='last_name' className='my-1'>
            Last Name
          </label>
          <input
            name='last_name'
            type='text'
            placeholder='Doe'
            id='last_name'
            onChange={handleInputChange}
            className='border rounded focus:outline-none p-2'
          />
        </div>
      </div>
      <div className='mb-3 w-full flex'>
        <div className='md:w-3/5 md:pr-4 flex flex-col'>
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
        <div className='md:w-2/5 flex flex-col'>
          <label htmlFor='role' className='my-1'>
            Role
          </label>
          <select
            name='role'
            id='email'
            onChange={handleInputChange}
            className='w-full border rounded focus:outline-none p-2'
          >
            <option>---select role---</option>
            <option className='Chef'>Chef</option>
            <option className='Waiter'>Waiter</option>
          </select>
        </div>
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
          name='contact'
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
