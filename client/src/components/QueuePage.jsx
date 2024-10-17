import React, { useEffect, useState } from "react";
import Marquee from "./Marquee";
import axios from "axios";
import OrdersContainer from "./OrdersContainer";
import { useNavigate } from "react-router-dom";
import CheckOrder from "./CheckOrder";
import ErrorBar from "./ErrorBar";

const QueuePage = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [holdOrders, setHoldOrders] = useState([]);
  const navigate = useNavigate()
  const [orderStatus , setOrderStatus] = useState("");
  const [noAcceptedOrder , setNoAcceptedOrder] = useState(false)
  const [currUser , setCurrUser] = useState({})

  const fetchAcceptedOrders = async () => {
    try {
      const url =
        import.meta.env.VITE_BACKEND_URL + "/v1/api/common/accepted-orders";

      const response = await axios.get(url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Accepted Orders:", response.data);
        const currOrders = response.data.orders;
        if(!currOrders)
        setNoAcceptedOrder(true);
      else
        setAcceptedOrders(response.data.orders);
      } else {
        console.log("error fetching accepted order");
      }
    } catch (error) {
      console.error("Error fetching accepted orders:", error);
    }
  };
  const fetchHoldOrders = async (e) => {
    try {
      const url =
        import.meta.env.VITE_BACKEND_URL + "/v1/api/common/hold-orders";

      const response = await axios.get(url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Hold Orders:", response.data.orders);
        setHoldOrders(response.data.orders);
      } else {
        console.log("error fethcing holdorders");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if(!loggedInUser) {
      navigate('/')
    }
    fetchAcceptedOrders();
    fetchHoldOrders();
  }, []);


  const setLocalStorageItemWithExpiry = (key, value) => {
    const now = new Date();
    const expiryDate = now.getTime() + (60 * 60 * 1000);
    const item = {
      value,
      expiry: expiryDate,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const placeOrder = async () => {
    try {
      const url = import.meta.env.VITE_BACKEND_URL + "/v1/api/customer/place-order";
  
      const response = await axios.get(url, {
        withCredentials: true
      });
      console.log(response)
      if (response.status === 201) {
        console.log("Order placed:", response.data.order);
        setLocalStorageItemWithExpiry('orderId', response.data.order._id);
        setOrderStatus("pending")

      } else {
        console.log("Error placing order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const getLocalStorageItem = (key) => {
  const itemStr = localStorage.getItem(key);
  
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  return item.value;
  };


  const fetchCurrentOrder = async (orderId) => {
  orderId = getLocalStorageItem('orderId');
  if (!orderId) {
    setOrderStatus("")
    return;
  }

  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/v1/api/common/current-order?orderId=${orderId}`;

    const response = await axios.get(url, {
      withCredentials: true
    });

    if (response.status === 200) {
      console.log("Current Order:", response.data.order);
      setOrderStatus(response.data.order.status)
      
    } else {
      console.log("Error fetching current order");
    }
  } catch (error) {
    console.error("Error fetching current order:", error);
  }
  };


  useEffect(() => {
    const orderId = getLocalStorageItem('orderId');
    
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setCurrUser(foundUser);
    } else {
      navigate('/')
    }

    if (orderId) {
      fetchCurrentOrder(orderId);
    } else {
    () => setOrderStatus("")
    }


  }, []); 

  const logOutHandler = async() => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/v1/api/common/logout`;
      const response = await axios.get(url , {withCredentials : true})
  
      if(response.status === 200) {
        console.log("user logged out ");
        localStorage.removeItem('user');
        setCurrUser({})
        navigate('/')
      }
    } catch (error) {
      console.log("error in loging user out " , error)
    }
  }

  const cancelOrderHandler = async() => {
    try {
      const orderId = getLocalStorageItem('orderId')
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
      localStorage.removeItem("orderId")
      setOrderStatus('');
      navigate('/queue')
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <Marquee />
      <div className="bg-gray-800 text-white p-4 flex justify-around items-center">
        <h1 className="text-xl font-bold">Want to order a haircut?</h1>
        
          {currUser && !currUser.shopOwner && orderStatus && orderStatus === "accepted" && <CheckOrder mess = "you are added to the queue" color="green" refreshFn={fetchCurrentOrder}/>}
          {currUser && !currUser.shopOwner && orderStatus && orderStatus === "rejected" && <CheckOrder mess = "order rejected , try again after 3 hrs" color="red" refreshFn={fetchCurrentOrder}/>}
          {currUser && !currUser.shopOwner && orderStatus && orderStatus === "pending" && <CheckOrder mess = "waiting for confirmation" color="orange" refreshFn={fetchCurrentOrder}/>}

        <div className="space-x-4">
         { currUser && currUser.shopOwner && <button 
          onClick={() => navigate("/orders")}
          className="bg-blue-500 text-white px-4 py-1  mb-1 rounded-md hover:bg-blue-600 transition duration-200">
            New Orders
          </button>}
         { !orderStatus && currUser && !currUser.shopOwner &&
          <button 
          onClick={placeOrder}
          className="bg-blue-500 text-white px-4 py-1 mb-1 rounded-md hover:bg-blue-600 transition duration-200">
            Place Order
          </button>}
         { !currUser && <button className="bg-blue-500 text-white px-4 py-1 mb-1 rounded-md hover:bg-blue-600 transition duration-200">
            Login
          </button> }
          {currUser && <button 
          onClick={logOutHandler}
          className="bg-red-500 text-white px-4 py-1 mb-1 rounded-md hover:bg-red-600 transition duration-200">
            Logout
          </button>} 
          {
          currUser && 
          !currUser.shopOwner && 
          (orderStatus === "pending" || orderStatus === "accepted") && (
            <button
              className="bg-red-500 text-white px-4 py-1 mb-1 rounded-md hover:bg-red-600 transition duration-200"
              onClick={cancelOrderHandler}
            >
              Cancel Order
            </button>
          )
        }
        </div>
      </div>
      {noAcceptedOrder && <ErrorBar mess="No orders right now" />}
      <div className="flex flex-wrap">
        <OrdersContainer title="Current Queue" orders={acceptedOrders} currUser={currUser} />
        <OrdersContainer title="Requests on Hold" orders={holdOrders} currUser={currUser} />
      </div>
      
    </div>
  );
};

export default QueuePage;
