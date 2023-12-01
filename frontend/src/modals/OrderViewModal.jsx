import React, { useState, useEffect, useRef } from "react";
// import QRCode from "react-qr-code";
// import html2canvas from "html2canvas";
import "./Modal.css";
import { useGlobalContext } from "../context/context";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../redux/actions/orderActions";

function OrderViewModal() {
  const dispatch = useDispatch();
  const receiptRef = useRef(null);
  const { isOrderViewModalOpen, closeOrderViewModal, viewOrderNo } =
    useGlobalContext();

  const { ordersList } = useSelector((state) => state.orders);

  const currentOrder = ordersList?.find((item) => item.id === viewOrderNo);

  const [items, setItems] = useState(
    currentOrder ? currentOrder.order_items : []
  );
  const total = 0.0;

  const handleCloseModal = () => {
    closeOrderViewModal();
    document.body.style.overflow = "auto";
  };

  const printReceipt = () => {
    window.print();
  };

  const downloadReceipt = () => {
    // html2canvas(receiptRef.current).then((canvas) => {
    //   const link = document.createElement("a");
    //   link.href = canvas.toDataURL("image/png");
    //   link.download = "receipt.png";
    //   link.click();
    // });
  };

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, viewOrderNo]);

  useEffect(() => {
    if (currentOrder) {
      setItems(currentOrder.order_items);
    }
  }, [currentOrder]);

  return (
    <div>
      {isOrderViewModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <div className='bg-white p-8' ref={receiptRef}>
              <div className='mb-4'>
                <h2 className='text-2xl font-semibold text-center'>
                  Kibandaski Restaurant
                </h2>
                <p className='text-gray-600 text-center'>
                  P.O Box 30197 - 10100, Nairobi
                </p>
                <p className='text-gray-600 text-center'>
                  Kenya Science, along Ngong' Road
                </p>
                <p className='text-gray-600 text-center'>Tel: +254740924507</p>
              </div>

              <div className='mb-4'>
                <p className='font-semibold'>Customer Name: Wamae</p>
                <p className='text-gray-600'>Sales Date: 1/12/2023 06:30pm</p>
              </div>

              <div className='mt-8'>
                <table className='min-w-full table-auto'>
                  <thead>
                    <tr className='bg-gray-100'>
                      <th className='py-2 px-2 text-left'>Item</th>
                      <th className='py-2 px-2 text-left'>Qty</th>
                      <th className='py-2 px-2 text-left'>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : ""}
                      >
                        <td className='py-2 px-2'>{item.title}</td>
                        <td className='py-2 px-2'>{item.qty}</td>
                        <td className='py-2 px-2'>{item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className='bg-white'>
                      <td className='py-2 px-4 font-semibold'></td>
                      <td className='py-2 px-4'>Subtotal</td>
                      <td className='py-2 px-4 font-semibold'>
                        KES {total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* <div className='mt-8'>
                <QRCode value={`Receipt for Wamae, Total: KES ${total}`} />
              </div> */}
            </div>
            <div className='flex justify-between'>
              <button onClick={handleCloseModal} className='mt-3'>
                Close
              </button>
              <button
                className='bg-green-500 text-white py-2 px-4 rounded'
                onClick={downloadReceipt}
              >
                Download
              </button>
              <button
                className='bg-blue-500 text-white py-2 px-4 rounded mr-2'
                onClick={printReceipt}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderViewModal;
