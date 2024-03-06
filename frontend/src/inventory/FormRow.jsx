function FormRows({ rowsData, deleteTableRows, handleChange }) {
  return rowsData.map((data, index) => {
    const { item_sku, item_title, unit, unit_type, unit_price, min_stock_units, supplier, purchase_date } = data;
    return (
      <tr key={index} className=''>
        <td className='gap-3'>
          <input
            type='text'
            value={item_sku}
            onChange={(evnt) => handleChange(index, evnt)}
            name='item_sku'
            className='border border-gray-600 focus:outline-amber-700 focus:outline-1 px-2'
            placeholder="Item Unique Code"
          />
        </td>
        <td>
          <input
            type='text'
            value={item_title}
            onChange={(evnt) => handleChange(index, evnt)}
            name='item_title'
            className='border border-gray-600 focus:outline-amber-700 focus:outline-1 px-2'
            placeholder="Item Title"
          />
        </td>
        <td>
          <input
            type='number'
            value={unit}
            onChange={(evnt) => handleChange(index, evnt)}
            name='unit'
            className='border border-gray-600 focus:outline-amber-700 focus:outline-1 px-2'
            placeholder="1"
          />
        </td>
        <td>
          <input
            type='text'
            value={unit_type}
            onChange={(evnt) => handleChange(index, evnt)}
            name='unit_type'
            className='border border-gray-600 focus:outline-amber-700 focus:outline-1 px-2'
            placeholder="eg. packets, bales, Kg, dozen etc."
          />
        </td>
        <td>
          <input
            type='number'
            value={unit_price}
            onChange={(evnt) => handleChange(index, evnt)}
            name='unit_price'
            className='border border-gray-600 focus:outline-amber-700 focus:outline-1 px-2'
            placeholder="0"
          />
        </td>
        <td>
          <input
            type='number'
            value={min_stock_units}
            onChange={(evnt) => handleChange(index, evnt)}
            name='min_stock_units'
            className='border border-gray-600 focus:outline-amber-700 focus:outline-1 px-2'
            placeholder="3"
          />
        </td>
        <td>
          <input
            type='text'
            value={unit * unit_price}
            // onChange={(evnt) => handleChange(index, evnt)}
            name='stock_value'
            className='border border-gray-600 focus:outline-amber-700 focus:outline-1 px-2'
          />
        </td>
        <td>
          <input
            type='text'
            value={supplier}
            onChange={(evnt) => handleChange(index, evnt)}
            name='supplier'
            className='border border-gray-600 focus:outline-amber-700 focus:outline-1 px-2'
            placeholder="Supplier A"
          />
        </td>
        <td>
          <input
            type='date'
            value={purchase_date}
            onChange={(evnt) => handleChange(index, evnt)}
            name='purchase_date'
            className='border border-gray-600 focus:outline-amber-700 focus:outline-1 px-2'
          />
        </td>
        <td className="px-3">
          <button
            className='bg-red-500 text-white uppercase py-1 px-3'
            onClick={() => deleteTableRows(index)}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}
export default FormRows;
