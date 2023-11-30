import React, { useEffect } from "react";
import DishesList from "../dishes/DishesList";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { IoIosAdd } from "react-icons/io";
import { useGlobalContext } from "../context/context";
import { useDispatch, useSelector } from "react-redux";
import { listMeals } from "../redux/actions/mealsActions";
import Loading from "../utils/Loading";
import Message from "../utils/Message";

const MealsAndDishes = () => {
  const dispatch = useDispatch();
  const { openMealCreateModal } = useGlobalContext();

  const { loading, mealsList, error } = useSelector((state) => state.meals);

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch]);

  // useEffect(() => {
  //   if (mealsList) {
  //     console.log(mealsList);
  //   } else if (loading) {
  //     console.log("loading...");
  //   } else if (error) {
  //     console.log(error);
  //   }
  // }, [dispatch, loading, mealsList, error]);
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-3 my-3'>
        <div className='col-span-1 flex items-center'>
          <h3 className='text-gray-800 font-semibold text-xl uppercase my-auto'>
            Meals & Dishes
          </h3>
        </div>
        <div className='col-span-1 lg:col-span-2'>
          <div className='w-full grid lg:grid-cols-4'>
            <div className='col-span-1 lg:col-span-3 mt-2 lg:mt-0 lg:px-2 mb-2 lg:mb-0 flex gap-1'>
              <input
                type='text'
                className='w-4/5 border focus:outline-none px-2 py-1 rounded text-md'
                placeholder='Search Meal details...'
              />
              <button className='border rounded bg-amber-400 w-1/5 text-white'>
                <SearchOutlinedIcon />
              </button>
            </div>
            <button
              className='col-span-1 mt-2 md:mt-0 flex gap-1 items-center justify-center bg-amber-400 text-white'
              onClick={openMealCreateModal}
            >
              <IoIosAdd style={{ fontSize: "28px" }} />
              Add New Meal
            </button>
          </div>
        </div>
      </div>
      <div className='my-3'>
        {loading ? <Loading /> : error && <Message>{error}</Message>}
      </div>
      <DishesList list={mealsList} />
    </div>
  );
};

export default MealsAndDishes;
