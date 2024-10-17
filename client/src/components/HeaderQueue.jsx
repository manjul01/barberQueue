import React from 'react';

const HeaderQueue = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Current Queues</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Login</button>
    </div>
  );
};

export default HeaderQueue;
