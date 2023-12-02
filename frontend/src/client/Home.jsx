import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMeals } from "../redux/actions/mealsActions";
import { Link } from "react-router-dom";
import CartModal from "../modals/CartModal";
import { useGlobalContext } from "../context/context";
import { addToCart } from "../redux/actions/cartActions";

const Home = () => {
  const { openCartModal } = useGlobalContext();
  const dispatch = useDispatch();
  const { mealsList } = useSelector((state) => state.meals);

  useEffect(() => {
    dispatch(listMeals());
  }, []);

  const addItemToCart = (id) => {
    dispatch(addToCart(id));
  };
  return (
    <>
      <CartModal />
      <section
        className='bg-cover bg-center h-screen'
        style={{
          backgroundImage: `url('/assets/mandazi.webp')`,
        }}
      >
        <div className='bg-opacity-75 h-full bg-black flex flex-col justify-center items-center'>
          <h1 className='text-4xl lg:text-5xl font-semibold mb-4 text-white text-center'>
            Welcome to Kibandaski Hotel
          </h1>
          <p className='text-lg mb-6 text-white text-center'>
            A place for comrades, Have a seat, relax and be served within no
            time!
          </p>
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold text-center my-3 text-amber-500'>
              Our Menu
            </h2>
            <table className='min-w-full table-auto'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='py-2 px-2 text-left'></th>
                  <th className='py-2 px-2 text-left'>Item</th>
                  <th className='py-2 px-2 text-left'>Qty</th>
                  <th className='py-2 px-2 text-left'>Price</th>
                </tr>
              </thead>
              <tbody>
                {mealsList?.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className='py-2 px-2'>
                      <img
                        src={item.media_url}
                        alt=''
                        className='w-10 h-10 border object-cover'
                      />
                    </td>
                    <td className='py-2 px-2'>{item.title}</td>
                    <td className='py-2 px-2'>{item.qty}</td>
                    <td className='py-2 px-2'>{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-center mt-3'>
              <a
                href='#meals-and-dishes'
                className='bg-amber-500 px-4 py-2 text-white font-semibold'
              >
                Make your Order
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white p-12' id='meals-and-dishes'>
        <h2 className='text-3xl text-gray-700 text-center font-semibold my-3'>
          Meals & Dishes
        </h2>
        <div className='bg-slate-50 p-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4'>
          {mealsList.map((item) => {
            return (
              <div className='col-span-1 bg-white p-2 shadow m-2' key={item.id}>
                <img
                  src='/assets/mandazi.webp'
                  alt='...'
                  className='h-38 object-cover'
                />
                <div className='flex justify-between items-center'>
                  <h6 className='text-gray-800 text-xl my-1'>{item.title}</h6>
                  <p className='bg-slate-50 text-blue-400 px-4 py-1'>
                    KES {item.price}
                  </p>
                </div>
                <p className='text-gray-600 text-sm py-2'>{item.details}</p>
                <div className='flex justify-between items-center'>
                  <button
                    className='bg-amber-500 text-white uppercase'
                    onClick={() => addItemToCart(item.id)}
                  >
                    Add To Cart
                  </button>
                  {item.is_ready ? (
                    <p className='bg-slate-50 text-green-400 px-4 py-1'>
                      Ready
                    </p>
                  ) : (
                    <p className='bg-slate-50 text-red-400 px-4 py-1'>
                      Not Ready
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className='flex my-2 justify-center'>
        <button
          className='bg-amber-500 text-white uppercase px-4 py-2'
          onClick={openCartModal}
        >
          View Cart
        </button>
      </div>
    </>
  );
};

export default Home;
