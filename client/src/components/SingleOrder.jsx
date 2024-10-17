import React, { useState } from 'react';
import axios from 'axios';

const SingleOrder = ({ name, dateString, orderId ,shopOwner}) => {

  const [orderStatus, setOrderStatus] = useState(null);

  const formatIndianTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', options);
  };

  const time = formatIndianTime(dateString);

  const deleteOrder = async () => {
    try {
      const url =
      import.meta.env.VITE_BACKEND_URL + "/v1/api/shop/delete-order";
      const data = {
        orderId 
      }
      console.log(orderId)
      const response = await axios.post(url, data, {
        withCredentials: true
      });
      console.log(response)
      setOrderStatus('Order completed , kindly refresh');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const updateOrderStatus = async (status) => {
    try {
      const url =
      import.meta.env.VITE_BACKEND_URL + "/v1/api/shop/update-order";
      const data = {
        orderId , status
      }
      console.log(orderId)
      const response = await axios.post(url, data, {
        withCredentials: true
      });
      console.log(response)
      if(response.status === 200) {
        if (response.data.order.status === 'rejected') {
          setOrderStatus('Order rejected');
        } else if (response.data.order.status === 'hold') {
          setOrderStatus('Order on hold');
        }
      } else {
        console.log("error updating status" ,response.message)
      }
      
    } catch (error) {
      console.error('Error updating order status: in catch block', error);
      
    }
  };

  return (
    <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-2 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex flex-row items-center space-x-2">
        <div className="text-lg font-semibold text-gray-800">{name}</div>
        <div className="text-sm text-gray-600">{time}</div>
      </div>
      {orderStatus ? (
        <div className="mt-4 text-center">
          <span className={`px-4 py-2 rounded-md ${
            orderStatus.includes('deleted') ? 'bg-green-200 text-green-800' :
            orderStatus.includes('rejected') ? 'bg-red-200 text-red-800' :
            'bg-yellow-200 text-yellow-800'
          }`}>
            {orderStatus}
          </span>
        </div>
      ) : (
        shopOwner &&
        <div className="flex space-x-2">
          <button
            className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition duration-200"
            onClick={deleteOrder}
          >
            Done
          </button>
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-200"
            onClick={() => updateOrderStatus('rejected')}
          >
            Cancel
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition duration-200"
            onClick={() => updateOrderStatus('hold')}
          >
            cancel order
          </button>
        </div>
        
      )}
      
    </div>
  );
};

export default SingleOrder;
