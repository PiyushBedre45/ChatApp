import { createContext, useContext, useState } from "react";

const PicContext = createContext();

const PicProvider = ({ children }) => {
  const [profilePic, setProfilePic] = useState([]);
  return (
    <PicContext.Provider value={[profilePic, setProfilePic]}>
      {children}
    </PicContext.Provider>
  );
};

const usePic = () => useContext(PicContext);

export { usePic, PicProvider };
