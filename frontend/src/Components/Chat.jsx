import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import ChatHeader from "./ChatHeader";
const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const isUserPresent = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/register");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      console.log(currentUser);
    }
  };

  useEffect(() => {
    isUserPresent();
  }, []);

  const getUser = async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        console.log("yeppp");
        const response = await axios.get(
          `http://localhost:3000/getallusers/${currentUser._id}`
        );
        console.log(response.data.user);
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
          <div className="w-full bg-[#FCF5ED] rounded-r-md">hi piyush</div>
        </div>
      </div>
    </>
  );
};

export default Chat;
