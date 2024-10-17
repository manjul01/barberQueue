import React, { useState } from 'react';
import axios from 'axios';

const NewOrder = ({ order }) => {
  const [responseStatus, setResponseStatus] = useState(null);

  const formatIndianTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', options);
  };

  const time = formatIndianTime(order.createdAt);
  const orderId = order._id;
  const userId = order.userId;

  const handleUpdateOrder = async (status) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/v1/api/shop/update-order`;
      const response = await axios.post(url, {
        orderId,
        status,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log(`Order ${status}`);
        setResponseStatus(status); // Update responseStatus to hide buttons and show "Responded"
      } else {
        console.error(`Error updating order to ${status}`);
      }
    } catch (error) {
      console.error(`Error updating order to ${status}:`, error);
    }
  };

  const handleAccept = () => {
    handleUpdateOrder('accepted');
  };

  const handleReject = () => {
    handleUpdateOrder('rejected');
  };

  return (
    <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-2 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="text-lg font-semibold text-gray-800">{order.username}</div>
      <div className="text-sm text-gray-600">{time}</div>
      <div className="flex space-x-2">
        {responseStatus ? (
          <div className="text-sm font-semibold text-gray-800">Responded</div>
        ) : (
          <>
            <button
              onClick={handleAccept}
              className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition duration-200"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-200"
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NewOrder;
