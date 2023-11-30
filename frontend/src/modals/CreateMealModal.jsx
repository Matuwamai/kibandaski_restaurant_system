import React, { useEffect, useState } from "react";
import "./Modal.css";
import { useGlobalContext } from "../context/context";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import Loading from "../utils/Loading";
import Message from "../utils/Message";
import { useDispatch, useSelector } from "react-redux";
import { createMeal, listMeals } from "../redux/actions/mealsActions";

export default function CreateMealModal() {
  const bucket_url = process.env.REACT_APP_BUCKET_URL;
  const dispatch = useDispatch();
  const { isMealCreateModalOpen, closeMealCreateModal } = useGlobalContext();
  const { loading, success_create, error } = useSelector(
    (state) => state.meals
  );

  // Memoize the handleCloseModal function
  const handleCloseModal = () => {
    closeMealCreateModal();
    document.body.style.overflow = "auto";
  };

  const [mealInfo, setMealInfo] = useState({
    details: "",
    qty: "",
    price: "",
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

  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app, bucket_url);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          reject(error); // Reject the Promise if an error occurs
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error); // Reject the Promise if an error occurs during URL retrieval
          }
        }
      );
    });
  };

  const handleCreateMeal = async (e) => {
    e.preventDefault();
    try {
      // Wait for the uploadImage function to complete and obtain the download URL
      setImageLoading(true);
      setImageError(null);
      const downloadURL = await uploadImage();
      setImageLoading(false);
      dispatch(
        createMeal({
          ...mealInfo,
          price: Number(mealInfo.price),
          qty: Number(mealInfo.qty),
          media_url: downloadURL,
        })
      );
    } catch (error) {
      // Handle any errors that occurred during the upload process
      setImageLoading(false);
      setImageError(error);
    }
  };

  useEffect(() => {
    if (success_create) {
      dispatch(listMeals());
    }
  }, [dispatch, success_create]);

  return (
    <div>
      {isMealCreateModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3 className='h3 text-gray-800 uppercase font-semibold my-2'>
              Create New Meal & Dishes
            </h3>
            {imageLoading ? (
              <Loading />
            ) : (
              imageError && <Message>Error uploading image</Message>
            )}
            {loading ? <Loading /> : error && <Message>{error}</Message>}
            <form onSubmit={handleCreateMeal}>
              <div className='mb-3 flex flex-col'>
                <label htmlFor='meals' className='my-1'>
                  Meal & Dishes Details
                </label>
                <input
                  name='details'
                  type='text'
                  placeholder='Chapo Mandondo - Supu ya matumbo'
                  id='meals'
                  onChange={handleInputChange}
                  className='border rounded focus:outline-none p-2'
                />
              </div>
              <div className='mb-3 flex flex-col'>
                <label htmlFor='qty' className='my-1'>
                  Quantity
                </label>
                <input
                  type='number'
                  placeholder='1'
                  id='amount'
                  name='qty'
                  onChange={handleInputChange}
                  className='border rounded focus:outline-none p-2'
                />
              </div>
              <div className='mb-3 flex flex-col'>
                <label htmlFor='amount' className='my-1'>
                  Price
                </label>
                <input
                  type='number'
                  placeholder='100'
                  id='amount'
                  name='price'
                  onChange={handleInputChange}
                  className='border rounded focus:outline-none p-2'
                />
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
              </div>
              <div className='flex items-center justify-between'>
                <button className='btn-close' onClick={handleCloseModal}>
                  Close
                </button>
                <button type='submit' className='bg-amber-400 text-white h-10'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
