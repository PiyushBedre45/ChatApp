import React, { useState } from "react";
import axios from "axios";
import { server } from "../..";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthenticate } from "../../context/authenticate";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      const { data } = await axios.post(
        `${server}/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.success === false) {
        toast.success(data.message);
      }
      if (data.success === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" w-full h-[100vh] flex items-center justify-center ">
        <div className=" bg-[#FBF9F1] w-[70%] h-[80%] flex shadow-2xl">
          <form
            onSubmit={handleOnSubmit}
            className="  bg-[#FBF9F1] h-[100%] w-full flex flex-col gap-4 "
          >
            <div className="  w-[90%] mx-auto flex flex-col gap-4 mt-[50px]">
              <h1 className=" text-4xl font-semibold">Register here</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="w-[90%] h-[60%] mx-auto flex flex-col gap-4 justify-center mt-[10px] ">
              <div className="flex flex-col gap-2">
                <h1>Name</h1>
                <input
                  className=" w-[85%] h-[38px] border-2 p-4  border-[#gdfgg] rounded-sm"
                  type="name"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1>Email</h1>
                <input
                  className=" w-[85%] h-[38px] border-2 p-4  border-[#gdfgg] rounded-sm"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1>Password</h1>
                <input
                  className=" w-[85%] h-[38px] border-2 p-4 border-[#gdfgg] rounded-sm"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className=" border-2 border-white w-[85%] h-[38px] rounded-md bg-[#b1e9f2]">
                submit
              </button>
              <h1>
                If you have an Account!
                <Link to={"/login"}>
                  <span className="text-[#4e41ff]"> Login</span>
                </Link>
              </h1>
            </div>
          </form>
          <div className="border-2 border-white w-full mx-auto h-[100%] flex flex-col gap-4 items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src="https://img.freepik.com/free-vector/sharing-content-social-media_23-2148517381.jpg?size=626&ext=jpg&ga=GA1.1.1291901581.1686554670&semt=ais"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
