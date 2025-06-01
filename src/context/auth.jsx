import { createContext, useContext, useState } from "react";
import api from "../../axios";

const AuthContext = createContext({
  user: null,
  token: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  // const getCurrentUser = () => {};
  const register = async (data) => {
    
    setIsLoading(true);
    try {
     
      const response = await api.post("/users", data);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const singIn = ({ email, password }) => {};
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        singIn,
        register,
        logout,
        isAuthenticated,
        user,
        token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
