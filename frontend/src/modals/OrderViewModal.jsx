import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { LiaDownloadSolid } from "react-icons/lia";
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

  const handleCloseModal = () => {
    closeOrderViewModal();
    document.body.style.overflow = "auto";
  };

  const printReceipt = () => {
    window.print();
  };

  const downloadReceipt = () => {
    html2canvas(receiptRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "receipt.png";
      link.click();
    });
  };

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, viewOrderNo]);

  useEffect(() => {
    if (currentOrder) {
      setItems(currentOrder.orderItems);
    }
  }, [currentOrder]);

  console.log(currentOrder);

  const originalDatetime = new Date(currentOrder?.created_at);

  // Format the datetime in the desired way
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDatetime = originalDatetime.toLocaleString("en-US", options);

  function getItemTotals(a, b) {
    const sum = a * b;
    return sum.toFixed(2);
  }

  return (
    <div>
      {isOrderViewModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content order-view'>
            <div className='relative'>
              <div className='sticky top-0 right-0 left-0 flex justify-end items-center gap-1 bg-amber-100 py-2 pr-2'>
                <button
                  className='receipt-btn border text-3xl'
                  onClick={downloadReceipt}
                >
                  <LiaDownloadSolid />
                </button>
                <button
                  className='receipt-btn border text-3xl'
                  onClick={printReceipt}
                >
                  <MdOutlineLocalPrintshop />
                </button>
                <button
                  onClick={handleCloseModal}
                  className='receipt-btn border text-3xl'
                >
                  <IoCloseOutline />
                </button>
              </div>
              <div className='bg-white p-4' ref={receiptRef}>
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
                  <p className='text-gray-600 text-center'>
                    Tel: +254740924507
                  </p>
                </div>

                <div className='mb-4'>
                  <p className='font-semibold'>
                    Customer Name: {currentOrder?.customer_name}
                  </p>
                  <p className='text-gray-600'>
                    Sales Date: {formattedDatetime}
                  </p>
                </div>

                <div className='mt-8'>
                  <table className='min-w-full table-auto'>
                    <thead>
                      <tr className='bg-gray-100'>
                        <th className='py-2 px-2 text-left'>Item</th>
                        <th className='py-2 px-2 text-left'>Qty</th>
                        <th className='py-2 px-2 text-right'>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items?.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-50" : ""}
                        >
                          <td className='py-2 px-2'>{item.title}</td>
                          <td className='py-2 px-2'>
                            {item.quantity} * {item.price}
                          </td>
                          <td className='py-2 px-2 text-end'>
                            {getItemTotals(item.price, item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className='bg-white'>
                        <td className='py-2 px-4 font-semibold'></td>
                        <td className='py-2 px-4'>Subtotal</td>
                        <td className='py-2 px-2 font-semibold text-end'>
                          KES {currentOrder?.amount.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className='mt-4 mb-3  flex flex-col items-center justify-center '>
                  <p className='text-sm text-gray-600 mb-2'>
                    Order made{" "}
                    <span className='font-semibold text-gray-800'>
                      {currentOrder?.table_no === 0
                        ? "Over the Counter"
                        : `at Table No ${currentOrder?.table_no}`}
                    </span>
                  </p>
                  <QRCode
                    value={`Receipt for ${currentOrder?.customer_name}, Total: KES ${currentOrder?.amount}`}
                    size={120}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderViewModal;
