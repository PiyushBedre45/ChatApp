import React from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

const ChatContainer = ({ currentChat }) => {
  console.log(currentChat);
  return (
    <>
      {currentChat && (
        <div className="w-full flex flex-col gap-3 h-full border-2 border-black">
          <div className=" w-[95%] mx-auto flex gap-4 mt-[10px]">
            <img
              className="w-[45px] h-[45px]"
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
            <h1>{currentChat.name}</h1>
          </div>
          <hr className="border-[#c5c5c5] mt-[10px]" />
          <Messages />
          <ChatInput />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
