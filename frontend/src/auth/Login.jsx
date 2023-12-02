import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../utils/Loading";
import Message from "../utils/Message";
import { login } from "../redux/actions/userActions";
import { useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (userInfo?.access) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <section
      className='bg-cover bg-center h-screen'
      style={{
        backgroundImage: `url('/assets/mandazi.webp')`,
      }}
    >
      <div className='bg-opacity-75 h-full bg-black flex flex-col justify-center items-center'>
        <h1 className='text-4xl lg:text-5xl font-semibold mb-4 text-white text-center'>
          Login to Kibandaski Management System
        </h1>
        <p className='text-lg mb-6 text-white text-center'>
          Transform the way you approach your business management.
        </p>
        <div className='bg-white p-8 rounded-lg shadow-lg'>
          <form onSubmit={handleLogin}>
            {loading ? <Loading /> : error && <Message>{error}</Message>}
            <div className='mb-4'>
              <label htmlFor='schoolName' className='block text-lg mb-1'>
                Email
              </label>
              <input
                type='text'
                id='schoolName'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full bg-gray-100 text-gray-800 rounded-lg py-2 px-4'
                placeholder='kiganjoprimary@nyeri'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-lg mb-1'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-gray-100 text-gray-800 rounded-lg py-2 px-4'
                placeholder='Choose a password'
                required
              />
            </div>

            {/* Sign Up Button */}
            <div className='text-center'>
              <button
                type='submit'
                className='bg-amber-400 w-96 hover:bg-amber-500 text-white text-lg py-2 px-6 rounded-full inline-block transition duration-300 ease-in-out'
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
