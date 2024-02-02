import React from "react";

const Messages = ({ getMsg }) => {
  return (
    <>
      <div className=" w-full h-[75%] overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide">
        <h1>{getMsg}</h1>
      </div>
    </>
  );
};

export default Messages;
