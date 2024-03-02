import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import CompletedTransactions from '../transactions/Completed';
import { listCompletedTransactions } from '../redux/actions/paymentActions';

const Transactions = () => {
  const dispatch = useDispatch();
  const {completTransactions} = useSelector((state) => state.payments);
  console.log(completTransactions);
  useEffect(() => {
    dispatch(listCompletedTransactions());
  }, [dispatch])
  return (
    <div>
      <h3 className='text-gray-800 font-semibold text-xl uppercase my-auto'>
        Transactions
      </h3>
      <div className='w-max text-sm font-medium text-center text-gray-500 border-b border-gray-200'>
        <ul className='flex flex-wrap -mb-px'>
          <li className='me-2'>
            <Link
              href='/transactions'
              className='inline-block p-4 text-amber-400 border-b-2 border-amber-400 rounded-t-lg'
              //   aria-current='page'
            >
              Completed
            </Link>
          </li>
          <li className='me-2'>
            <Link
              to='/transactions'
              className='inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300'
            >
              Cancelled
            </Link>
          </li>
        </ul>
      </div>
      <section className='mt-3'>
        <CompletedTransactions />
      </section>
    </div>
  );
}

export default Transactions