import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { MdVerified } from "react-icons/md";
import { CgDanger } from "react-icons/cg";

const MealsView = () => {
  const { mealsList } = useSelector((state) => state.meals);
  const params = useParams();
  const mealId = Number(params.id);

  const currentMeal = mealsList?.find((meal) => meal.id === mealId);

  return (
    <div className='w-full bg-slate-50 flex justify-center md:p-4'>
      <div className='w-96 bg-white rounded py-4 px-2 md:px-8'>
        <img
          src={currentMeal?.media_url}
          alt='meal'
          className='w-full object-contain'
        />
        <h4 className='text-xl font-semibold text-gray-700 mt-2'>
          {currentMeal?.details}
        </h4>
        <div className='flex justify-between my-1'>
          <h6 className='bg-slate-100 px-4 py-1 rounded text-blue-400'>
            Quantity {currentMeal?.qty}
          </h6>
          <h6 className='bg-slate-100 px-4 py-1 rounded text-blue-400'>
            KES {currentMeal?.price}
          </h6>
        </div>
        <p className='text-gray-600 text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          necessitatibus nisi, consectetur placeat provident rem dolorum sit
          nobis quo deserunt itaque dolorem, blanditiis aut maxime. Quidem
          mollitia non consequatur eligendi.
        </p>
        {currentMeal?.is_ready ? (
          <div className='w-full flex gap-2 items-center justify-center bg-green-400 text-white px-4 py-1 rounded font-semibold mt-3'>
            <MdVerified style={{ fontSize: "18px" }} />
            <h6 className='my-auto'>Ready</h6>
          </div>
        ) : (
          <div className='w-full flex gap-2 items-center justify-center bg-slate-300 text-white px-4 py-1 rounded font-semibold mt-3'>
            <CgDanger style={{ fontSize: "18px" }} />
            <h6 className='my-auto'>Ready</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealsView;
