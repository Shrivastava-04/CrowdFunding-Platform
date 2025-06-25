import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import validator from 'validator';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const Base_Url = import.meta.env.VITE_BASE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if(data.password1!==data.password2){
      console.log(data.password1)
      console.log(data.password2)
      console.log("Please enter the same password")
      toast.error("Please enter the same password");
      return
    }
    const userInfo = {
      name: data.fullname,
      role: data.role,
      email: data.email,
      password: data.password1,
    };
    await axios
      .post(`${Base_Url}/user/signup`, userInfo)
      .then((res) => {
        localStorage.setItem("user_id",res.data.user_id);
        // alert(res.data.message);
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      }).catch((error)=>{
        toast.error(error.response.data.message)
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-16  flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
          >
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Sign Up</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Name"
                      {...register("fullname", { required: true })}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="role"
                      name="role"
                      type="text"
                      list="roles"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Role"
                      {...register("role", { required: true })}
                    />
                    <label
                      htmlFor="role"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Role
                    </label>
                    <datalist id="roles">
                      <option value="Backer"></option>
                      <option value="Creator"></option>
                    </datalist>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      {...register("email", { required: true })}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password1"
                      name="password"
                      type = {showPassword?"text":"password"}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      {...register("password1", { required: true })}
                    />
                    <label
                      htmlFor="password1"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    <div
                      className="absolute right-2 top-2 cursor-pointer text-gray-600"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password2"
                      name="password2"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      {...register("password2", { required: true })}
                    />
                    <label
                      htmlFor="password2"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Enter the confirm password
                    </label>
                  </div>
                  {/* <div class="relative"> */}
                  <button className="bg-cyan-500 text-white rounded-md px-2 py-1 cursor-pointer">
                    Submit
                  </button>
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center mb-5">
              <span>Already a user</span>
              <a
                href="/login"
                className="pl-1 text-blue-300 hover:text-blue-500 hover:scale-110 hover:-translate-y-0.5 hover:ease-in-out underline"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Signup;
