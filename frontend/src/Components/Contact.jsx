import React, { useState } from "react";

const Contact = ({ contacts, changeChat }) => {
  console.log("hi contact", contacts);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    console.log(contact);
  };
  console.log("selected chat no :", currentSelected);

  return (
    <>
      <div className=" overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide  rounded-l-md p-4">
        <div className=" flex flex-col gap-1">
          {contacts.map((contact, index) => (
            <div key={contact._id}>
              <div
                className={`flex items-center border-2 border-[#656565] w-[100%] h-[70px] mx-auto bg-[#FCF5ED] rounded-md`}
                onClick={() => changeCurrentChat(index, contact)}
              >
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
