import React from "react";

const Contact = ({ contacts }) => {
  console.log("hi contact", contacts);
  return (
    <>
      <div className=" w-[50%] overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide bg-[#e5b49c] p-4 ">
        <div className="mt-[20px] flex flex-col gap-1">
          {contacts.map((contact, index) => (
            <div key={contact._id}>
              <div className="flex items-center border-2 border-black w-[100%] h-[70px] mx-auto bg-[#f4dfd5]">
                <div className="flex w-[95%] mx-auto gap-4">
                  <img
                    className="w-[60px] h-[60px]"
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
