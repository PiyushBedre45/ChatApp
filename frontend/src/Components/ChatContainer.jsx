import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatContainer = ({ currentChat, currentUser }) => {
  const [getMsg, setGetMsg] = useState("");
  const [getAllMessages, setGetAllMessages] = useState([]);

  console.log(currentChat);
  console.log(currentUser);

  const allMessages = async () => {
    if (currentUser && currentChat) {
      const response = await axios.post("http://localhost:3000/getmsg", {
        from: currentUser._id,
        to: currentChat._id,
      });
      console.log(response.data.projectedMessages);
      setGetAllMessages(response.data.projectedMessages);
    }
  };
  useEffect(() => {
    allMessages();
  }, [currentChat]);

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
        <div className="w-full flex flex-col gap-3 h-full ">
          <div className="flex flex-col gap-2">
            <div className=" w-[95%] mx-auto flex gap-4 mt-[10px]">
              <img
                className="w-[45px] h-[45px]"
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                alt=""
              />
              <h1 className="font-semibold text-md">{currentChat.name}</h1>
            </div>
            <hr className="border-[#c5c5c5] mt-[10px]" />
          </div>

          {/* All messages */}
          <div className=" h-[480px] overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide">
            <div className=" flex flex-col gap-4 w-[90%]  mx-auto text-xl">
              {getAllMessages.map((message) => (
                <div
                  className={`${
                    message.fromSelf
                      ? " flex justify-end "
                      : " flex justify-start "
                  }`}
                >
                  <p
                    className={`${
                      message.fromSelf
                        ? "bg-[#f06454] font-semibold text-white  flex items-center justify-center h-[40px] pl-5 pr-5 rounded-[20px]"
                        : "bg-[#128b9e] font-semibold text-white  flex items-center justify-center h-[40px] pl-5 pr-5 rounded-[20px]"
                    }`}
                  >
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
