import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "emoji-picker-react";

function ChatInput() {
  const [showEmojipicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojipicker);
  };
  return (
    <>
      <div
        id="emojiBox"
        className="border-2 border-red-500  w-[1px] h-[400px] absolute bottom-[150px] "
      >
        {showEmojipicker && <Picker className="w-[300px] h-[400px]" />}
      </div>
      <div className="border-2 border-black w-full h-[50px] flex items-center justify-center ">
        <div className="border-2 border-red-500  w-[95%] h-[85%] mx-auto flex items-center">
          <button className="border-2  border-red-500 h-[90%] w-[5%] flex items-center justify-center ">
            <BsEmojiSmile
              className="text-2xl "
              onClick={handleEmojiPickerHideShow}
            />
          </button>
          <input
            className="w-[85%] h-[90%] pl-[15px] "
            type="text"
            placeholder="Enter the message here"
          />
          <button className="border-2 text-white border-red-500 bg-[#f8919d] w-[10%] h-[90%] flex items-center justify-center">
            <IoMdSend className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatInput;
