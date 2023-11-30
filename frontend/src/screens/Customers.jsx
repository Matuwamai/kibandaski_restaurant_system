import React from "react";
import CustomersList from "../customers/CustomersList";

const Customers = () => {
  return (
    <div>
      <h3 className='text-gray-800 font-semibold text-xl capitalize my-3'>
        Registered Customers
      </h3>
      <CustomersList />
      <div className='flex justify-start'></div>
    </div>
  );
};

export default Customers;
