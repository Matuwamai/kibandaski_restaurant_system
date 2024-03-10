import { useState } from "react";
import FormRows from "./FormRow";
function AddDeleteFormRow() {
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      item_sku: "",
      item_title: "",
      unit: "",
      unit_type: "",
      unit_price: "",
      min_stock_units: "",
      supplier: "",
      purchase_date: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  return (
    <section>
      <div className="flex justify-between">
        <h4 className='text-xl my-2'>Record Purchase Items</h4>
        {rowsData.length > 0 && (
          <button className='bg-green-400 text-white uppercase px-4 py-1 my-3 rounded-none'>
            Save Records
          </button>
        )}
      </div>
      <div className='overflow-x-auto bg-slate-100 p-2'>
        <table className='w-full custom-table'>
          <thead>
            <tr className='w-screen'>
              <th className='text-left'>Item SKU</th>
              <th className='text-left'>Item Title</th>
              <th className='text-left'>Unit</th>
              <th className='text-left'>Unit Type</th>
              <th className='text-left'>Unit Price</th>
              <th className='text-left'>Min Stock Units</th>
              <th className='text-left'>Stock Value</th>
              <th className='text-left'>Supplier</th>
              <th className='text-left'>Purchase Date</th>
              <th className='px-3'>
                <button
                  className='bg-green-500 text-white uppercase py-1 px-3'
                  onClick={addTableRows}
                >
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <FormRows
              rowsData={rowsData}
              deleteTableRows={deleteTableRows}
              handleChange={handleChange}
            />
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default AddDeleteFormRow;
