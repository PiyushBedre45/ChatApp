import React from "react";
import robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <>
      <div className=" w-full h-full flex items-center">
        <div className="  w-[80%] mx-auto flex flex-col items-center justify-center">
          <img className="w-[400px] h-[400px] " src={robot} alt="Robot" />
          <h1 className="font-semibold text-3xl">
            Welcome, <span className="text-[#f8919d]">{currentUser.name}!</span>
          </h1>
          <h1 className="text-xl ">
            Please select the chat you want to Message
          </h1>
        </div>
      </div>
    </>
  );
};

export default Welcome;
