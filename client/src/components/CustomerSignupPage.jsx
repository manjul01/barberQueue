import React, { useState, useTransition } from "react";
import { Link , useNavigate} from "react-router-dom";
import ErrorBar from "./ErrorBar";
import axios from "axios";

const CustomerSignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mess, setMess] = useState("");
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    setMess(""); 

    if (password !== confirmPassword) {
      setMess("Passwords do not match");
      return;
    }

    try {
      const url =
        import.meta.env.VITE_BACKEND_URL + "/v1/api/customer/customer-signup";
      const data = {
        name,
        email,
        password,
      };

      const response = await axios.post(url, data , {
        withCredentials : true
      });

      if (response.status === 200) {
          navigate("/customer-login")
      } else {
        setMess("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during customer signup:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMess(error.response.data.message);
      } else {
        setMess("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl">
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1629881544138-c45fc917eb81?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Customer"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Customer Signup
          </h2>
          <form className="space-y-4">
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-teal-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-teal-500"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirmPassword"
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:border-teal-500"
              />
            </div>
            <button
              onClick={(e) => submitHandler(e)}
              type="submit"
              className="w-full bg-teal-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-700">already registered? </span>
            <Link
              href="/customer-login"
              className="text-teal-500 hover:text-teal-600 font-semibold"
            >
              Login
            </Link>
          </div>
          {mess && <ErrorBar mess={mess} />}
        </div>
      </div>
    </div>
  );
};

export default CustomerSignupPage;
