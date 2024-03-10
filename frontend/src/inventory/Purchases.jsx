import React from 'react'

const Purchases = () => {
  return (
    <section className='overflow-x-auto'>
      <table className='w-full border custom-table whitespace-no-wrap'>
        <thead>
          <tr className='min-w-full text-md'>
            <th className='text-left border px-2'>Item SKU</th>
            <th className='text-left border px-2'>Item Title</th>
            <th className='text-left border px-2'>Units</th>
            <th className='text-left border px-2'>Unit Type</th>
            <th className='text-left border px-2'>Unit Price</th>
            <th className='text-left border px-2'>Min Stock Units</th>
            <th className='text-left border px-2'>Stock Value</th>
            <th className='text-left border px-2'>Supplier</th>
            <th className='text-left border px-2'>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-y'>
            <td className='px-2'>SDJASNF32</td>
            <td className='px-2'>Item A</td>
            <td className='px-2'>3</td>
            <td className='px-2'>Packet(s)</td>
            <td className='px-2'>1000</td>
            <td className='px-2'>2</td>
            <td className='px-2'>3000</td>
            <td className='px-2'>Supplier A</td>
            <td className='px-2'>03/06/2024</td>
          </tr>
          <tr className='min-w-full border-y'>
            <td className='px-2'>SDJASNF32</td>
            <td className='px-2'>Item A. This is a very Long Item title</td>
            <td className='px-2'>3</td>
            <td className='px-2'>Packet(s)</td>
            <td className='px-2'>1000</td>
            <td className='px-2'>2</td>
            <td className='px-2'>3000</td>
            <td className='px-2'>Supplier A</td>
            <td className='px-2'>03/06/2024</td>
          </tr>
          <tr className='border-y'>
            <td className='px-2'>SDJASNF32</td>
            <td className='px-2'>Item A</td>
            <td className='px-2'>3</td>
            <td className='px-2'>Packet(s)</td>
            <td className='px-2'>1000</td>
            <td className='px-2'>2</td>
            <td className='px-2'>3000</td>
            <td className='px-2'>Supplier A</td>
            <td className='px-2'>03/06/2024</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Purchases