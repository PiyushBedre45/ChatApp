import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import ChatHeader from "./ChatHeader";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

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
        <div className=" w-[85%] mx-auto h-[90%] flex">
          <div className="w-[50%] bg-[#b1e9f2] rounded-l-md p-4 gap-3 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide flex flex-col">
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
