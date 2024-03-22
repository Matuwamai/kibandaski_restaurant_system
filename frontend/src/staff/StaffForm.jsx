import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStaff,
  getStaffDetails,
  updateStaffDetails,
} from "../redux/actions/staffActions";
import Loading from "../utils/Loading";
import Message from "../utils/Message";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const StaffForm = ({ type = "add" }) => {
  const params = useParams();
  const staff_id = params.id;
  const dispatch = useDispatch();

  const { loading, error, created, updated, staffDetails } = useSelector(
    (state) => state.staff
  );
  const [staffInfo, setStaffInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    id_no: "",
    role: "",
    contact: "",
  });

  const handleInputChange = (e) => {
    setStaffInfo({ ...staffInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "add") {
      dispatch(
        createStaff({
          user: {
            first_name: staffInfo.first_name,
            last_name: staffInfo.last_name,
            username: staffInfo.last_name,
            email: staffInfo.email,
            contact: staffInfo.contact,
            password: staffInfo.contact,
          },
          id_number: staffInfo.id_no,
          role: staffInfo.role,
        })
      );
      if (created) {
        toast.success("Staff added!", ToastObjects);
      }
    } else if (type === "edit") {
      dispatch(
        updateStaffDetails(
          staff_id,
          staffDetails.email === staffInfo.email
            ? {
                user: {
                  first_name: staffInfo.first_name,
                  last_name: staffInfo.last_name,
                  contact: staffInfo.contact,
                },
                id_number: staffInfo.id_no,
                role: staffInfo.role,
              }
            : {
                user: {
                  first_name: staffInfo.first_name,
                  last_name: staffInfo.last_name,
                  contact: staffInfo.contact,
                  email: staffInfo.email,
                },
                id_number: staffInfo.id_no,
                role: staffInfo.role,
              }
        )
      );
      if (updated) {
        toast.success("Staff updated!", ToastObjects);
      }
    }
  };

  useEffect(() => {
    if (created) {
      setStaffInfo({
        first_name: "",
        last_name: "",
        email: "",
        id_no: "",
        role: "",
        contact: "",
      });
    }
  }, [created]);

  useEffect(() => {
    if (staff_id) {
      dispatch(getStaffDetails(staff_id));
    }
  }, [dispatch, staff_id]);

  useEffect(() => {
    if (staffDetails && staff_id) {
      setStaffInfo({
        first_name: staffDetails.first_name,
        last_name: staffDetails.last_name,
        email: staffDetails.email,
        id_no: staffDetails.id_number,
        role: staffDetails.role,
        contact: staffDetails.contact,
      });
    }
  }, [staffDetails, staff_id]);

  return (
    <form onSubmit={handleSubmit}>
      {loading ? <Loading /> : error && <Message>{error}</Message>}
      <div className='mb-3 flex flex-wrap justify-between'>
        <div className='flex flex-col'>
          <label htmlFor='first_name' className='my-1'>
            First Name
          </label>
          <input
            name='first_name'
            value={staffInfo.first_name}
            type='text'
            placeholder='John'
            id='first_name'
            onChange={handleInputChange}
            className='border rounded focus:outline-none p-2'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='last_name' className='my-1'>
            Last Name
          </label>
          <input
            name='last_name'
            value={staffInfo.last_name}
            type='text'
            placeholder='Doe'
            id='last_name'
            onChange={handleInputChange}
            className='border rounded focus:outline-none p-2'
          />
        </div>
      </div>
      <div className='mb-3 w-full flex'>
        <div className='md:w-3/5 md:pr-4 flex flex-col'>
          <label htmlFor='email' className='my-1'>
            Email
          </label>
          <input
            name='email'
            value={staffInfo.email}
            type='email'
            placeholder='johndoe@gmail.com'
            id='email'
            onChange={handleInputChange}
            className='border rounded focus:outline-none p-2'
          />
        </div>
        <div className='md:w-2/5 flex flex-col'>
          <label htmlFor='role' className='my-1'>
            Role
          </label>
          <select
            name='role'
            id='role'
            onChange={handleInputChange}
            className='w-full border rounded focus:outline-none p-2'
          >
            <option value=''>---select role---</option>
            <option value='Chef'>Chef</option>
            <option value='Waiter'>Waiter</option>
          </select>
        </div>
      </div>
      <div className='mb-3 flex flex-col'>
        <label htmlFor='id_no' className='my-1'>
          ID NO
        </label>
        <input
          type='number'
          placeholder='********'
          id='id_no'
          name='id_no'
          value={staffInfo.id_no}
          onChange={handleInputChange}
          className='border rounded focus:outline-none p-2'
        />
      </div>
      <div className='mb-3 flex flex-col'>
        <label htmlFor='phone_no' className='my-1'>
          Contact
        </label>
        <input
          type='number'
          placeholder='0* ** *** ***'
          id='phone_no'
          name='contact'
          value={staffInfo.contact}
          onChange={handleInputChange}
          className='border rounded focus:outline-none p-2'
        />
      </div>
      <div className='flex items-center justify-between'>
        <button type='submit' className='bg-amber-400 text-white w-1/2'>
          Submit
        </button>
        {type === "add" && (
          <div className='bg-white rounded-sm mx-2 p-1'>
            <p className='text-xs text-blue-600'>
              Upon successful creation, an email will be sent to the staff with
              the initial password!
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default StaffForm;
