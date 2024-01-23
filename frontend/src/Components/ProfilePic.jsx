import React, { useEffect } from "react";
import { usePic } from "../context/profileImg";

const ProfilePic = () => {
  const [profilePic, setProfilePic] = usePic();
  console.log(profilePic);

  useEffect(() => {
    // Get the current user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem("chat-app-user"));

    // Update the avatarimage property
    currentUser.newavatarimage = profilePic;

    // Store the updated user data back in localStorage
    localStorage.setItem("chat-app-user", JSON.stringify(currentUser));
  }, [profilePic]); // Run this effect whenever profilePic changes
  return (
    <>
      <h1>hi</h1>
      <h1>{profilePic}</h1>
    </>
  );
};

export default ProfilePic;
