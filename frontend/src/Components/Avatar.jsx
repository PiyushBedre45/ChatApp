import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const Avatar = () => {
  const [avatars, setAvatar] = useState([]);
  const setProfilePicture = async () => {
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
    setProfilePicture();
  }, []);

  return (
    <>
      <div className="border-2 border-black w-full h-[200px] flex items-center justify-center ">
        <div className="w-[40%] ">
          <div className=" flex items-center justify-between">
            {avatars.map((avatar, index) => (
              <div key={index._id}>
                <div className=" flex w-[100px]">
                  <img
                    className=" w-full h-full object-cover rounded-[60px]"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Avatar;
