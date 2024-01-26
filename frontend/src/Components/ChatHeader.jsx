import React from "react";

const ChatHeader = () => {
  return (
    <>
      <div className="border-2 border-black  w-full h-[85px] ">
        <div className=" w-[100%] mx-auto flex justify-between ">
          <h1 className="font-semibold text-xl ">CHAT</h1>
          <div className="  flex gap-4">
            <p>icon</p>
            <p>icon</p>
          </div>
        </div>
        <div className="w-full  h-[60px] flex items-center justify-center gap-1">
          <p>icon</p>
          <input
            className="w-[90%] bg-[#FCF5ED] rounded-sm pl-2 h-[28px] flex items-center"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
