import React from "react";
import AddDeleteFormRow from "./AddDeleteFormRow";

const InventorySection = () => {
  return (
    <div className='mt-4'>
      <h4 className='text-xl my-2'>Record Purchase Items</h4>
      <section className='bg-slate-100 p-2'>
        <AddDeleteFormRow />
      </section>
    </div>
  );
};

export default InventorySection;
