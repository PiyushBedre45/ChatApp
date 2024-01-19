import React, { useState } from "react";
import axios from "axios";
import { server } from "../..";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      const { data } = await axios.post(
        `${server}/login`,
        {
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="border-2 border-white  w-full h-[100vh] flex items-center justify-center ">
        <div className=" bg-[#FBF9F1] w-[70%] h-[80%] flex   ">
          <form
            onSubmit={handleOnSubmit}
            className="  bg-[#FBF9F1] h-[100%] w-full flex flex-col gap-4 "
          >
            <div className="border-2 border-white  w-[90%] mx-auto flex flex-col gap-4 mt-[50px]">
              <h1 className=" text-4xl font-semibold">Login</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className=" border-2 border-white  w-[90%] h-[40%] mx-auto flex flex-col gap-4 justify-center items-center">
              <input
                className=" w-[80%] h-[38px] border-2 p-4  border-[#gdfgg] rounded-sm"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className=" w-[80%] h-[38px] border-2 p-4 border-[#gdfgg] rounded-sm"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className=" border-2 border-white w-[80%] h-[38px] rounded-md bg-[#b1e9f2]">
                submit
              </button>
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

export default Login;
