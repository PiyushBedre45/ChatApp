import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../..";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  // Handle Submit

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (handelValidation()) {
      const { name, password } = values;
      const response = await axios.post(`${server}/login`, {
        name,
        password,
      });
      console.log(response.data);
      if (response.data.status === false)
        return toast.error(response.data.message);
      if (response.data.status === true) {
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(response.data.user)
        );
        navigate("/");
      }
    }
  };

  // Handle Change

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // Handle Validation

  const handelValidation = () => {
    const { name, password } = values;
    if (password === "") {
      toast.error("Password should required");
      return false;
    } else if (name.length === "") {
      toast.error("Username should required");
      return false;
    }
    return true;
  };

  return (
    <>
      <div className=" w-full h-[100vh] flex items-center justify-center ">
        <div className=" bg-[#FBF9F1] w-[70%] h-[80%] flex shadow-2xl">
          {/* Form */}
          <form
            onSubmit={handleOnSubmit}
            className="  bg-[#FBF9F1] h-[100%] w-full flex flex-col gap-4 "
          >
            <div className="  w-[90%] mx-auto flex flex-col gap-2 mt-[40px]">
              <h1 className=" text-4xl font-semibold">Login here</h1>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="w-[90%] h-[50%] mx-auto flex flex-col gap-3 justify-center  ">
              <div className="flex flex-col gap-2">
                <h1>Name</h1>
                <input
                  className=" w-[85%] h-[38px] border-2 p-4  border-[#gdfgg] rounded-sm"
                  type="name"
                  name="name"
                  placeholder="Enter your name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1>Password</h1>
                <input
                  className=" w-[85%] h-[38px] border-2 p-4 border-[#gdfgg] rounded-sm"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button className=" border-2 border-white w-[85%] h-[38px] rounded-md bg-[#b1e9f2]">
                Login
              </button>
              <h1>
                Don't you have an Account!
                <Link to={"/register"}>
                  <span className="text-[#4e41ff]"> Register</span>
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

export default Login;
