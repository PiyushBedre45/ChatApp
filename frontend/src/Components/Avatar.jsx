import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { Link, useNavigate } from "react-router-dom";
import { server } from "..";
import toast from "react-hot-toast";
import { useAuthenticate } from "../context/authenticate";
// import { usePic } from "../context/profileImg";

const Avatar = () => {
  const navigate = useNavigate();
  const [avatars, setAvatar] = useState([]);
  const [selectAvatar, setSelectAvatar] = useState(undefined);
  const [isAuthenticate, setIsAuthenticate] = useAuthenticate();
  // const [profilePic, setProfilePic] = usePic([]);

  console.log(isAuthenticate);
  const setAvatarPicture = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const response = await axios.get(
        `https://api.multiavatar.com/45678945/${Math.round(
          Math.random() * 1000
        )}`
      );
      const buffer = new Buffer(response.data);
      data.push(buffer.toString("base64"));
    }
    setAvatar(data);
    console.log(data);
  };

  // useEffect(() => {
  //   if (!localStorage.getItem("chat-app-user")) {
  //     navigate("/login");
  //   }
  // }, []);

  const setProfilePicture = async () => {
    if (selectAvatar === undefined) {
      toast.error("plz select the avatar");
    } else {
      console.log("hi");
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      console.log("user:", user);
      const { data } = await axios.post(`${server}/setAvatar/${user._id}`, {
        image: avatars[selectAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/chat");
      } else {
        toast.error(" error in avatar setting");
      }
      console.log("data:", data);
    }
  };
  useEffect(() => {
    setAvatarPicture();
  }, []);

  return (
    <>
      <div className="w-[80%] mx-auto flex flex-col items-center justify-center mt-[100px]">
        {/* Heading */}
        <div className="w-[80%] mx-auto flex items-center justify-center mt-[40px]">
          <h1 className="text-3xl font-bold text-white -tracking-wide">
            Pick an avatar as a profile picture
          </h1>
        </div>

        {/* Avatar */}
        <div className=" w-full h-[200px] flex items-center justify-center mt-[20px]">
          <div className="w-[40%] ">
            <div className="  flex items-center justify-between">
              {avatars.map((avatar, index) => (
                <div
                  key={index._id}
                  className="flex items-center justify-center"
                >
                  {/* this is where you select the avatar */}
                  <div
                    className={`${
                      selectAvatar === index
                        ? "border-solid border-[#b1e9f2] border-[4px] p-1 rounded-[60px] flex w-[100px]"
                        : " p-1 rounded-[60px] flex w-[100px]"
                    }`}
                  >
                    <img
                      className=" w-full h-full object-cover rounded-[60px]"
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt=""
                      onClick={() => setSelectAvatar(index)}
                    />
                    {console.log("clg:", avatars[selectAvatar])}
                  </div>
                </div>
              ))}
              {/* <Link to={"/pro"}>
                <button
                  onClick={() => {
                    setProfilePic([...profilePic, avatars[selectAvatar]]);
                    console.log("hoooo");
                  }}
                >
                  setting image
                </button>
              </Link> */}
            </div>
          </div>
        </div>

        {/* Button To Set Avatar */}
        <div className="w-[80%] mx-auto flex items-center justify-center mt-[40px]">
          <button
            className="bg-[#3bb3c5] rounded-md h-[50px] w-[250px] font-semibold text-xl text-white"
            onClick={() => setProfilePicture()}
          >
            SET AVATAR
          </button>
        </div>
      </div>
    </>
  );
};

export default Avatar;
