import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();

  console.log(currentChat);
  console.log(currentUser);
  console.log(socket);

  const allMessages = async () => {
    if (currentChat && currentUser) {
      const response = await axios.post("http://localhost:3000/getmsg", {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data.projectedMessages);
    }
  };
  useEffect(() => {
    allMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post("http://localhost:3000/addmsg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    console.log(msgs);
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log({ msg });
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    } else {
      console.log("socket.current is null or undefined");
    }
  }, [currentChat]);
  console.log(arrivalMsg);

  useEffect(() => {
    arrivalMsg && setMessages((perv) => [...perv, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

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
              {messages.map((message) => (
                <div
                  ref={scrollRef}
                  key={uuidv4()}
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
