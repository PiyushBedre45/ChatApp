import React, { useState } from "react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";

const ChatContainer = ({ currentChat, currentUser }) => {
  const [getMsg, setGetMsg] = useState("");
  console.log(currentChat);
  console.log(currentUser);

  const handleSendMsg = async (msg) => {
    const response = await axios.post("http://localhost:3000/addmsg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    setGetMsg(response.data.message);
  };

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
          <Messages getMsg={getMsg} />
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
