import React, { useContext, useState } from "react";

import healthImg from "../assets/health-img.png";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../provider/DataProvide";

const SignUpPage = () => {
  const { setUser,setSelectedMenu } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  // const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    mail: "",
    number: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    try {
      if (formData.password === formData.confirmPassword) {
        const newUserData = {
          username: formData.username,
          name: formData.name,
          password: formData.password,
          mail: formData.mail,
          number: formData.number,
          age: formData.age,
          gender: formData.gender,
        };
        console.log(newUserData);
        const response = await fetch(
          "https://healthcare-2fif.onrender.com/registration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserData),
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          console.log("first")
          Swal.fire({
            title: "Congratulation!",
            text: "Successfully Login",
            icon: "success",
          });
          setUser(data.user);
          setSelectedMenu("Dashboard")
          navigate("/dashboard/home");
        } else {
          console.error("Login failed:", data);
          // Handle login failure, show error message, etc.
        }
      } else {
        setError({ message: "Password not matching" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      console.log(error.message)
      setError({message:"User already exist"})
    }
  };

  return (
    <div className="2xl:h-screen mx-4 lg:mx-auto flex flex-col justify-center items-center bg p-10">
      <h1 className="text-center text-5xl font-bold text-[#ed4286] pt-10 2xl:pt-16">
        Health Care
      </h1>
      <p className="text-center text-lg mt-4">Stay with us, stay healthy</p>
      <p className="text-center text-lg">Live your life long with happiness</p>
      <div className="w-[1100px] flex flex-col lg:flex-row justify-between   rounded mt-16">
        <div className="lg:w-1/2 h-full flex justify-between items-center rounded">
          <div className="lg:w-[80%] h-full flex justify-between items-center mx-auto">
            <img src={healthImg} alt="sign up"></img>
          </div>
        </div>
        <div className="lg:w-1/2 px-8 py-6 bg-white bg-opacity-20 shadow-md rounded-md">
          <h2 className="text-2xl lg:text-4xl text-center font-semibold mb-4">
            Sign Up
          </h2>
          <p className="text-center mt-4 mb-4">
            Enter your details below to create account and get started
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  type="username"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="mb-4">
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
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your confirm password"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="mb-4">
                <label
                  htmlFor="mail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mail
                </label>
                <input
                  type="mail"
                  id="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your age"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="male" className="mr-4">
                  Male
                </label>

                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            {error?.message && (
              <>
                <div>
                  <p className="text-center text-red-700 mb-2">
                    {error?.message}
                  </p>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-[#ed4286] text-white py-2 px-4 rounded-md hover:bg-[#c24977] transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 mb-4">
            Already have an account?{" "}
            <Link to="/">
              <span className="text-[#ed4286]">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
