import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {  FaSignOutAlt } from 'react-icons/fa';
import API_BASE_URL from '../ApiBaseUrl';

const UserHome = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}user/logout`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: 'POST',
          });
    
          if (response.ok) {
            alert('Logged out successfully');
            navigate('/account');
          } else {
            const data = await response.json();
            alert(`Logout failed: ${data.message}`);
          }
        } catch (error) {
          console.error('Error during logout:', error);
          alert('An error occurred while logging out.');
        }
      };

      function goToBook(){
        navigate('/book');
      }


    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-300 flex flex-col items-center justify-center">

            <div className='flex flex-row justify-between'>
                <div className="absolute top-6 left-6 flex items-center space-x-3">
                    <img
                        src="logo.png"
                        alt="Logo"
                        className="h-10 w-10"
                    />
                    <h1 className="text-2xl font-semibold text-black">MenuLite</h1>
                </div>

                <button
                    onClick={handleLogout}
                    className="absolute top-6 right-6 flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition ml-4"
                >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                </button>
            </div>

            <div className='flex justify-between md:flex-row flex-col'>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-3xl p-8 md:p-12 text-left flex flex-col justify-center items-left ml-10"
                >
                    <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-blue-900">
                        Enhance Your Dining Experience!
                    </h1>
                    <p className="mt-4 text-lg text-blue-600">
                        Discover the perfect blend of taste, ambiance, and hospitality. Experience dining like never before!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={goToBook}
                        className="mt-6 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none"
                    >
                        Book Now
                    </motion.button>
                </motion.div>

                <motion.img
                    src="app.png"
                    alt="Decorative Bowl"
                    className="w-54 md:w-lvw opacity-80"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

            </div>
        </div>
    );
};

export default UserHome;