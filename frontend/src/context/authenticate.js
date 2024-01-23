import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  return (
    <AuthContext.Provider value={[isAuthenticate, setIsAuthenticate]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthenticate = () => useContext(AuthContext);

export { useAuthenticate, AuthProvider };
