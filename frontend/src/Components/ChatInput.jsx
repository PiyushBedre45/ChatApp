import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "emoji-picker-react";

function ChatInput({ handleSendMsg }) {
  const [showEmojipicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojipicker);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message = message + event.emoji; // message = message  + emoji.emoji
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <div
        id="emojiBox"
        className="  w-[1px] h-[420px] absolute bottom-[150px] "
      >
        {showEmojipicker && <Picker onEmojiClick={handleEmojiClick} />}
      </div>
      <div className="w-full h-[50px] flex items-center justify-center ">
        <div className="  w-[95%] h-[85%] mx-auto flex items-center">
          <button className="  h-[90%] w-[5%] flex items-center justify-center ">
            <BsEmojiSmile
              className="text-2xl "
              onClick={handleEmojiPickerHideShow}
            />
          </button>
          <form className="w-[85%] h-[90%]" onSubmit={(e) => sendChat(e)}>
            <input
              className="w-full h-full pl-[15px]"
              type="text"
              placeholder="Enter the message here"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </form>
          <div className=" text-white bg-[#f8919d] w-[10%] h-[90%] flex items-center justify-center">
            <button className="submit" onClick={(e) => sendChat(e)}>
              <IoMdSend className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatInput;
