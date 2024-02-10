import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import ChatHeader from "./ChatHeader";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";
// Reacts Icons
import { MdCall } from "react-icons/md";
import { FcVideoCall } from "react-icons/fc";
import { IoIosSettings } from "react-icons/io";
import { BiSolidMessage } from "react-icons/bi";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(currentUser);

  const socket = useRef();

  const isUserPresent = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/register");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      console.log(currentUser);
      setIsLoaded(true);
    }
  };
  socket.current = io("http://localhost:3000");

  useEffect(() => {
    if (currentUser) {
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentChat]);

  useEffect(() => {
    isUserPresent();
  }, []);

  const getUser = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const response = await axios.get(
          `http://localhost:3000/getallusers/${currentUser._id}`
        );
        setContacts(response.data.user);
      } else {
        navigate("/avatar");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  console.log(currentChat);

  useEffect(() => {
    handleChatChange();
  }, []);

  return (
    <>
      <div className=" w-full h-[100vh] flex items-center  ">
        <div className=" w-[85%] mx-auto h-[90%]  flex ">
          <div className="w-[5%]  bg-[#FCF5ED] rounded-l-md flex flex-col justify-between">
            <div className=" first h-[97%] my-auto flex flex-col justify-between ">
              <div className="w-full h-[120px] flex flex-col justify-evenly">
                <div className=" w-[90%] mx-auto h-[20%] flex items-center justify-center">
                  <BiSolidMessage className="text-xl  cursor-pointer" />
                </div>
                <div className="w-[90%] mx-auto h-[20%] flex items-center justify-center">
                  <MdCall className="text-xl text-green-600 cursor-pointer" />
                </div>
                <div className="w-[90%] mx-auto h-[20%] flex items-center justify-center">
                  <FcVideoCall className="text-xl  cursor-pointer" />
                </div>
              </div>
              <div className="w-full h-[130px] flex flex-col justify-evenly">
                <div className=" w-[90%] mx-auto h-[20%] flex items-center justify-center"></div>
                <div className=" w-[90%] mx-auto h-[20%] flex items-center justify-center ">
                  <IoIosSettings className="text-xl cursor-pointer" />
                </div>
                <div className=" w-[90%] mx-auto h-[20%] flex items-center justify-center">
                  {currentUser && (
                    <img
                      className="w-[30px] h-[30px] cursor-pointer"
                      src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%] bg-[#b1e9f2]  p-4 gap-3 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide flex flex-col">
            <ChatHeader />
            <hr className="border-black w-full" />
            <Contact contacts={contacts} changeChat={handleChatChange} />
          </div>
          <div className="w-full bg-[#FCF5ED] rounded-r-md ">
            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentUser={currentUser}
                currentChat={currentChat}
                socket={socket}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
