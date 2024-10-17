import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorBar from "./ErrorBar";

const ShopLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mess, setMess] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/v1/api/shop/shop-login`;
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/queue"); // Navigate to the shop dashboard after successful login
      } else {
        setMess("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during shop sign-in:", error);

      setMess("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl">
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1536520002442-39764a41e987?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Barber Shop"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Shop Login
          </h2>
          {mess && <p className="text-red-500 text-center">{mess}</p>}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-700">Not registered with us? </span>
            <Link
              to="/shop-signup"
              className="text-teal-500 hover:text-teal-600 font-semibold"
            >
              SignUp
            </Link>
          </div>
          {mess && <ErrorBar mess={mess} />}
        </div>
      </div>
    </div>
  );
};

export default ShopLoginPage;
