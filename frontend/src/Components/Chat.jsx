import axios from "axios";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

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
      } else {
        navigate("/avatar");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);
  return (
    <>
      <h1>hi piyush</h1>
    </>
  );
};

export default Chat;
