/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // API Call
  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,

    }
     await axios.post("http://localhost:4001/user/signup" , userInfo)
    .then((res) => {
      console.log(res.data);
      if(res.data){
        toast.success('signUp successfully')
      }
      localStorage.setItem("Users:",JSON.stringify(res.data.user))
    }).catch((err)=>{
      if(err.response){
        console.log(err);
      toast.error("Error: " + err.response.data.message);
      
      }
      
    })
  }
  return (
    <>
      <div  className="flex h-screen items-center justify-center ">
        <div
          
          className="w-[600px] "
        >
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>
            

            {/* {Email} */}

            <h3 className="font-bold text-lg">SignUp</h3>
            <div className="mt-4 space-y-2">
              <span>Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-80 px-3 py-1 outline-none rounded-md"
                {...register("fullname", { required: true })}
              />
              <br />
              {errors.fullname && (
                <span className="text-red-500">required</span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 outline-none rounded-md"
                {...register("email", { required: true })}
              />
               <br />
              {errors.email && (
                <span className="text-red-500">required</span>
              )}
            </div>
            {/* {Password} */}

            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 outline-none rounded-md"
                {...register("password", { required: true })}
              />
               <br />
              {errors.password && (
                <span className="text-red-500">required</span>
              )}
            </div>

            {/* {Button} */}
            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                SignUp
              </button>
              <p>
                Have account?{" "}
                <button
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </button>{" "}
                <Login />
              </p>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
