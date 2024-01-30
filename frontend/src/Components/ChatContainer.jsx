import React from "react";

const ChatContainer = ({ currentChat }) => {
  console.log(currentChat);
  return (
    <>
      {currentChat && (
        <div>
          <div className=" w-[95%] mx-auto flex gap-4 mt-[10px]">
            <img
              className="w-[45px] h-[45px]"
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
            <h1>{currentChat.name}</h1>
          </div>
          <hr className="border-[#c5c5c5] mt-[10px]" />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
