import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";

const Avatar = () => {
  const [avatars, setAvatar] = useState([]);
  const [selectAvatar, setSelectAvatar] = useState(undefined);

  const setProfilePicture = () => {
    console.log("hi");
  };

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
                        ? "border-solid border-[#6d4cb0] border-[4px] p-1 rounded-[60px] flex w-[100px]"
                        : " p-1 rounded-[60px] flex w-[100px]"
                    }`}
                  >
                    <img
                      className=" w-full h-full object-cover rounded-[60px]"
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt=""
                      onClick={() => setSelectAvatar(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button To Set Avatar */}
        <div className="w-[80%] mx-auto flex items-center justify-center mt-[40px]">
          <button
            className="bg-[#b984ee] rounded-md h-[50px] w-[250px] font-semibold text-xl text-white"
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
