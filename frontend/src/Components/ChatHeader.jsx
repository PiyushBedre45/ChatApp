import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiMiniBars3 } from "react-icons/hi2";
import { RiChatNewLine } from "react-icons/ri";

const ChatHeader = () => {
  return (
    <>
      <div className="w-full h-[95px] ">
        <div className=" w-[100%] mx-auto flex justify-between">
          <h1 className="font-semibold text-2xl ">CHAT</h1>
          <div className="  flex gap-2">
            <p className="text-2xl p-1 rounded-sm hover:bg-[#ececec] w-[35px] h-[35px] flex items-center justify-center cursor-pointer">
              <RiChatNewLine />
            </p>
            <p className="text-2xl p-1 rounded-sm hover:bg-[#ececec] w-[35px] h-[35px] flex items-center justify-center cursor-pointer">
              <HiMiniBars3 />
            </p>
          </div>
        </div>
        <div className="w-full  h-[60px] flex items-center justify-center gap-1">
          <p className="text-2xl cursor-pointer">
            <FiSearch />
          </p>
          <input
            className="outline-none w-[90%] bg-[#FCF5ED] rounded-sm pl-2 h-[30px] flex items-center"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
