import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">

      <div className="relative flex items-center justify-center text-center min-h-screen">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center brightness-50 bg-[url('assets/bg.jpg')]"
        ></div>

        <div className="animate-fadeIn relative ">
          <div className="mb-6">
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">Welcome to</p>
            <img
              src="logo_2.png"
              alt="MenuLite"
              className="h-12 w-auto mx-auto animate-fadeInSlow"
            />
          </div>
          <hr className="border-t border-gray-700 mx-auto my-4 w-3/4" />
          <p className="text-lg md:text-xl font-semibold tracking-wider">SIMPLIFY MENUS, ELEVATE DINING!</p>

          <button
            className="mt-6 px-6 py-2 bg-white text-black font-medium rounded-lg hover:scale-110 hover:bg-yellow-600 hover:text-white transition-transform duration-300"
            onClick={() => navigate('/account')}
          >
            Proceed to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;