import React, { useEffect, useState } from "react";
import NewOrder from "./NewOrder";
import axios from "axios";
import ErrorBar from "./ErrorBar";
import { useNavigate } from "react-router-dom";

const OrdersContainer = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const navigate = useNavigate();
  const fetchPendingOrders = async (e) => {
    try {
      const url =
        import.meta.env.VITE_BACKEND_URL + "/v1/api/common/pending-orders";

      const response = await axios.get(url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Hold Orders:", response.data.orders);
        setPendingOrders(response.data.orders);
      } else {
        console.log("error fethcing orders");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchPendingOrders();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="container mx-auto p-8 text-center bg-gray-900 bg-opacity-80 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6 md:inline md:mr-4 ">New Orders</h1>
        <button 
        onClick={() => navigate("/queue")}
        className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition duration-200 mb-2">
              Back to queue
        </button>
        {pendingOrders && pendingOrders.length > 0 ? (
          <div className="space-y-6">
            {pendingOrders.map((order) => (
              <NewOrder key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <ErrorBar mess={"No pending orders right now"} />
        )}
      </div>
    </div>
  );
};

export default OrdersContainer;
