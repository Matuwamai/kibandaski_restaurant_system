import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { uploadImage } from "../firebase/uploadImage";
import {
  listMeals,
  updateMeal,
  updateMealStatus,
} from "../redux/actions/mealsActions";
import { toast } from "react-toastify";
import Loading from "../utils/Loading";
import Message from "../utils/Message";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const MealsView = () => {
  const { mealsList, loading, error, success_update } = useSelector(
    (state) => state.meals
  );
  const dispatch = useDispatch();
  const params = useParams();
  const mealId = Number(params.id);

  const [mealInfo, setMealInfo] = useState({
    title: "",
    details: "",
    qty: "",
    price: "",
    media_url: "",
  });
  const [file, setFile] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setMealInfo({
      ...mealInfo,
      [name]: value,
    });
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    dispatch(updateMealStatus(mealId));
    if (success_update) {
      toast.success("Item updated successfully!", ToastObjects);
    }
  };

  const handleUpdateMeal = async (e) => {
    e.preventDefault();
    if (file === "") {
      dispatch(
        updateMeal(
          {
            ...mealInfo,
            price: Number(mealInfo.price),
            qty: Number(mealInfo.qty),
            media_url: currentMeal?.media_url,
          },
          mealId
        )
      );
    } else {
      try {
        // Wait for the uploadImage function to complete and obtain the download URL
        setImageLoading(true);
        setImageError(null);
        const downloadURL = await uploadImage(file);
        setImageLoading(false);
        dispatch(
          updateMeal(
            {
              ...mealInfo,
              price: Number(mealInfo.price),
              qty: Number(mealInfo.qty),
              media_url: downloadURL,
            },
            mealId
          )
        );
      } catch (error) {
        // Handle any errors that occurred during the upload process
        setImageLoading(false);
        setImageError(error);
      }
    }
    if (success_update) {
      toast.success("Item updated successfully!", ToastObjects);
    }
  };

  const currentMeal = mealsList?.find((meal) => meal.id === mealId);

  useEffect(() => {
    dispatch(listMeals());
  }, [dispatch, mealId, success_update]);

  useEffect(() => {
    setMealInfo(currentMeal);
  }, [currentMeal]);

  return (
    <div className='w-full bg-slate-50 md:p-4'>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 bg-white'>
        <div className='col-span-1 bg-white rounded py-4 px-2 md:px-8'>
          <div className='flex gap-1 items-center my-3 text-gray-600 uppercase text-sm'>
            <Link to='/' className='hover:underline hover:text-amber-400'>
              Home
            </Link>
            <i className='fa fa-angle-right text-lg' aria-hidden='true'></i>
            <Link
              to='/meals-and-dishes'
              className='hover:underline hover:text-amber-400'
            >
              Meales & Dishes
            </Link>
            <i className='fa fa-angle-right text-lg' aria-hidden='true'></i>
            <h6>{currentMeal?.title}</h6>
          </div>
          <img
            src={currentMeal?.media_url}
            alt='meal'
            className='w-full meal-img-view object-cover'
          />
          <h4 className='text-xl font-semibold text-gray-700 mt-2'>
            {currentMeal?.title}
          </h4>
          <div className='flex justify-between my-1'>
            <h6 className='bg-slate-100 px-4 py-1 rounded text-blue-400'>
              Quantity {currentMeal?.qty}
            </h6>
            <h6 className='bg-slate-100 px-4 py-1 rounded text-blue-400'>
              KES {currentMeal?.price}
            </h6>
          </div>
          <p className='text-gray-600 text-sm py-2'>{currentMeal?.details}</p>
          <div className='flex gap-3 items-center'>
            <button
              className='bg-amber-300 border rounded text-white font-semibold px-4 py-1'
              onClick={handleUpdateStatus}
            >
              Update Status
            </button>
            <h6 className='bg-slate-100 px-4 py-1 rounded text-blue-400'>
              {currentMeal?.is_ready ? (
                <span className='text-green-400'>Ready</span>
              ) : (
                <span className='text-red-500'>Not Ready</span>
              )}
            </h6>
          </div>
        </div>
        <form
          onSubmit={handleUpdateMeal}
          className='col-span-1 bg-slate-100 my-3 p-4'
        >
          <h6 className='text-xl text-gray-700 font-semibold'>
            Update Meal & Dishes Item
          </h6>
          {imageLoading ? (
            <Loading />
          ) : (
            imageError && <Message>Error uploading image</Message>
          )}
          {loading ? <Loading /> : error && <Message>{error}</Message>}
          <div className='mb-3 flex flex-col'>
            <label htmlFor='meals' className='my-1'>
              Title
            </label>
            <input
              name='title'
              value={mealInfo?.title}
              type='text'
              placeholder='Chapo Mandondo - Supu ya matumbo'
              id='meals'
              onChange={handleInputChange}
              className='border rounded focus:outline-none p-2'
            />
          </div>
          <div className='grid grid-cols-2'>
            <div className='col-span-1 mr-4 flex flex-col'>
              <label htmlFor='qty' className='my-1'>
                Quantity
              </label>
              <input
                type='number'
                placeholder='1'
                id='amount'
                name='qty'
                value={mealInfo?.qty}
                onChange={handleInputChange}
                className='border rounded focus:outline-none p-2'
              />
            </div>
            <div className='col-span-1 flex flex-col ml-4'>
              <label htmlFor='amount' className='my-1'>
                Price
              </label>
              <input
                type='number'
                placeholder='100'
                id='amount'
                name='price'
                value={mealInfo?.price}
                onChange={handleInputChange}
                className='border rounded focus:outline-none p-2'
              />
            </div>
          </div>
          <div className='mb-3 flex flex-col'>
            <label htmlFor='meals' className='my-1'>
              Descrption
            </label>
            <textarea
              name='details'
              value={mealInfo?.details}
              placeholder='Meal description...'
              onChange={handleInputChange}
              className='border rounded focus:outline-none p-2'
            ></textarea>
          </div>
          <div className='mb-3 flex flex-col'>
            <label htmlFor='file' className='my-1'>
              Add Image
            </label>
            <input
              name='file'
              type='file'
              id='file'
              onChange={(e) => setFile(e.target.files[0])}
              className='border rounded focus:outline-none p-2'
            />
            <input
              type='text'
              value={mealInfo?.media_url}
              className='border rounded focus:outline-none p-2 mt-3'
              placeholder='Image url here...'
            />
          </div>
          <button type='submit' className='w-full bg-amber-400 text-white h-10'>
            Update Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealsView;
