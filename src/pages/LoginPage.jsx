import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import healthImg from "../assets/health-img.png";
import Swal from "sweetalert2";
import { Context } from "../provider/DataProvide";

const LoginPage = () => {
  const { setUser, setSelectedMenu } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://healthcare-2fif.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Congratulation!",
          text: "Successfully Login",
          icon: "success",
        });
        setUser(data);
        setSelectedMenu("Dashboard");
        navigate("/dashboard/home");
      } else {
        console.error("Login failed:", data);
        // Handle login failure, show error message, etc.
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="h-screen  mx-4 lg:mx-auto flex-col justify-center items-center bg p-10">
      <h1 className="text-center text-5xl font-bold text-[#ed4286] pt-10 2xl:pt-16">
        Health Care
      </h1>
      <p className="text-center text-lg mt-4">Stay with us, stay healthy</p>
      <p className="text-center text-lg">Live your life with happiness</p>
      <div className="w-[1100px] mx-auto flex flex-col lg:flex-row justify-between  rounded mt-16">
        <div className="lg:w-1/2 h-full rounded">
          <div className=" flex justify-between items-start mx-4 mt-4"></div>
          <div className="lg:w-[80%] mx-auto">
            <img src={healthImg} alt="sign up" />
          </div>
        </div>
        <div className="lg:w-1/2 px-8 py-6 bg-white bg-blu bg-opacity-20 shadow-md rounded-md">
          <h2 className="text-2xl lg:text-4xl text-center font-semibold mb-4">
            Welcome back
          </h2>
          <p className="text-center mt-4">Glad to see you again</p>
          <p className="text-center mb-4">Login to account below</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your user name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ed4286] text-white py-2 px-4 rounded-md hover:bg-[#c24977] transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 mb-4">
            Don't have an account?{" "}
            <Link to="registration" className="text-[#ed4286]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
