import React from "react";
import ChatHeader from "./ChatHeader";

const Contact = ({ contacts }) => {
  console.log("hi contact", contacts);
  return (
    <>
      <div className="  overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide  rounded-l-md p-4">
        <ChatHeader />
        <div className="mt-[10px] flex flex-col gap-1">
          {contacts.map((contact, index) => (
            <div key={contact._id}>
              <div className="flex items-center border-2 border-[#656565] w-[100%] h-[70px] mx-auto bg-[#f4dfd5] rounded-md ">
                <div className="flex w-[95%] mx-auto gap-4">
                  <img
                    className="w-[55px] h-[55px]"
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                  <h1 className="font-semibold text-md">{contact.name}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Contact;
