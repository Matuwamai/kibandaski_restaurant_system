import React from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { CiMenuFries } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/slices/navSlices";

const TopBar = () => {
  const dispatch = useDispatch();
  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };
  return (
    <>
      <header className='bg-slate-50 sticky top-0 z-30 shadow-sm flex justify-between md:items-center p-4 big-screen-top'>
        <div className='flex items-center gap-4'>
          <h1 className='text-yellow-400 text-3xl font-semibold uppercase my-auto'>
            KMS
          </h1>
          <CiMenuFries
            className='font-semibold text-3xl text-yellow-400 cursor-pointer'
            onClick={handleSidebar}
          />
        </div>
        <div className='flex items-center gap-2'>
          <div className='relative md:w-8 md:h-8 rounded-full sm:bg-slate-200 flex items-center justify-center'>
            <ShoppingBasketIcon />
            <span className='w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white absolute top-0 right-0 text-sm badge'>
              0
            </span>
          </div>
          <div className='relative  md:w-8 md:h-8 rounded-full sm:bg-slate-200 flex items-center justify-center'>
            <NotificationsOutlinedIcon />
            <span className='w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white absolute top-0 right-0 text-sm badge'>
              1
            </span>
          </div>
          <div className='md:w-8 md:h-8 rounded-full sm:bg-slate-200 flex items-center justify-center settings-icon'>
            <SettingsOutlinedIcon />
          </div>
          <div>
            <img
              src='/assets/wamae.png'
              alt='logo'
              className='w-12 h-12 rounded-full img-cover border'
            />
          </div>
          <div className='profile-info'>
            <h4 className='my-0 font-semibold'>Wamae N</h4>
            <p className='py-0 text-gray-700'>Admin</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;
