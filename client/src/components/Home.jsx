import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-white shadow-lg">BarberQueue</h1>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-white mb-6">Are you a customer?</h2>
          <Link to={"/customer-login"}>
          <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Check the Queue</button></Link>
        </div>
        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-3xl font-bold text-white mb-6">Are you a shop owner?</h2>
          <Link to={"/shop-login"}>
          <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300">Manage the Queue</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
