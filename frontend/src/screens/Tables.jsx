import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Loading from "../utils/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  createTable,
  deleteAllTable,
  listTables,
} from "../redux/actions/tableActions";
import Message from "../utils/Message";

const Tables = () => {
  const dispatch = useDispatch();

  const { loading, error, success_create, success_delete, tablesList } =
    useSelector((state) => state.tables);

  const [lastTableNo, setLastTableNo] = useState(1);
  const [newTablesCount, setNewTablesCount] = useState(tablesList.length);

  const generateQRCodes = (url) => {
    return new Promise((resolve, reject) => {
      const tables = [];
      for (let i = lastTableNo + 1; i <= lastTableNo + newTablesCount; i++) {
        QRCode.toDataURL(url)
          .then((res) => {
            tables.push({ qr_code: res, table_no: i });
            if (i === lastTableNo + newTablesCount) {
              resolve(tables);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTable());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tables = await generateQRCodes("https://shangilia.netlify.app/");
      if (tables.length > 0) {
        dispatch(createTable(tables));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (success_create) {
      dispatch(listTables());
    }
  }, [dispatch, success_create, success_delete]);

  useEffect(() => {
    dispatch(listTables());
  }, []);

  useEffect(() => {
    setLastTableNo(tablesList.length);
  }, [tablesList]);

  return (
    <div>
      <div className='flex gap-5 justify-center bg-slate-50 p-3'>
        <div className='bg-white p-4 rounded flex flex-col items-center justify-between'>
          <div className='flex flex-col items-center'>
            <h2 className='w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-3xl text-amber-400'>
              {lastTableNo}
            </h2>
            <p className='py-1 text-gray-600'>No. of Tables</p>
          </div>
          <button
            className='bg-red-300 text-white rounded px-4 py-2 mt-3'
            onClick={handleDeleteAll}
          >
            Delete all tables
          </button>
        </div>
        <form className='bg-white p-4' onSubmit={handleSubmit}>
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
            <div
              className='col-span-1 my-3 mx-1 bg-white shadow p-2'
              key={table.table_no}
            >
              <img src={table.qr_code} alt='...' className='' />
              <h5 className='uppercase text-green-500 my-auto text-center'>
                table#{table.table_no}
              </h5>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Tables;
