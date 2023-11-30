import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Loading from "../utils/Loading";
import { useDispatch, useSelector } from "react-redux";
import { createTable, listTables } from "../redux/actions/tableActions";
import Message from "../utils/Message";

const Tables = () => {
  const dispatch = useDispatch();

  const { loading, error, success_create, tablesList } = useSelector(
    (state) => state.tables
  );

  const [tablesData, setTablesData] = useState([]);
  const [lastTableNo, setLastTableNo] = useState(1);
  const [newTablesCount, setNewTablesCount] = useState(tablesList.length);

  const generateQRCodes = async (url) => {
    return new Promise((resolve, reject) => {
      for (let i = lastTableNo + 1; i <= lastTableNo + newTablesCount; i++) {
        QRCode.toDataURL(url)
          .then((res) => {
            // set dataUrl state to dataU
            console.log(`table_no: ${i}`);
            setTablesData((prev) => {
              return [...prev, { qr_code: res, table_no: i }];
            });
            resolve(tablesData);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tables = await generateQRCodes();
    dispatch(createTable(tables));
  };

  useEffect(() => {
    if (success_create) {
      dispatch(listTables());
      // setLastTableNo(tablesList.length);
    }
  }, [dispatch, success_create]);

  useEffect(() => {
    dispatch(listTables());
  }, [dispatch]);

  return (
    <div>
      <div className='flex justify-center bg-slate-50 p-3'>
        <form onSubmit={handleSubmit}>
          <h6 className='h6 my-2 text-xl text-gray-800'>
            Enter number of table QR Codes
          </h6>
          <div className='flex flex-col gap-3'>
            <input
              type='number'
              className='border rounded px-3 py-1 focus:outline-none'
              onChange={(e) => setNewTablesCount(Number(e.target.value))}
            />
            <button
              className='bg-amber-400 rounded px-3 px-2 text-white border cursor-pointer font-semibold'
              type='submit'
            >
              Generate QR Codes
            </button>
          </div>
        </form>
      </div>
      <section className='mt-4 grid grid-cols-8'>
        <div className='col-span-8'>
          {loading ? <Loading /> : error && <Message>{error}</Message>}
        </div>
        {tablesList.map((table) => {
          return (
            <img
              src={table.qr_code}
              alt='...'
              className='col-span-1 m-3'
              key={table.table_no}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Tables;
