import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { resetTransactionInfo } from "../redux/slices/paymentSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {transactionInfo} = useSelector((state) => state.payments);
    useEffect(() => {
      if (transactionInfo) {
        const redirectTimer = setTimeout(() => {
          navigate("/orders");
          dispatch(resetTransactionInfo());
        }, 5000); // 5000 milliseconds = 5 seconds

        // Clear the timer if the component unmounts before the timeout
        return () => clearTimeout(redirectTimer);
      }
    }, [transactionInfo, navigate]);
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='bg-gray-100'>
          <div className='bg-white p-6  md:mx-auto'>
            <svg
              viewBox='0 0 24 24'
              className='text-green-600 w-16 h-16 mx-auto my-6'
            >
              <path
                fill='currentColor'
                d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
              ></path>
            </svg>
            <div className='text-center'>
              <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
                Payment Completed!
              </h3>
              <p className='text-gray-600 text-sm my-2'>
                Your Mpesa transaction of{" "}
                <b className='font-semibold'>KES {transactionInfo?.amount} </b>{" "}
                has been received and processed successfully!
              </p>
              <p className='text-gray-600 text-sm my-2 italic'>
                Your Reference code is{" "}
                <b className='font-semibold'>
                  {transactionInfo?.ReceiptNumber}
                </b>
              </p>
              <p className='text-gray-600 text-sm my-2 italic'>
                Thankyou, you will be redirected shortly...
              </p>
              <div className='py-10 text-center'>
                <a
                  href='/'
                  className='px-12 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3'
                >
                  Complete Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
