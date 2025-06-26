import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { db } from "../firbaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: null,
  token: null,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const signUp = async (data) => {
    setIsLoading(true);
    if (!data.name || !data.email || !data.password) {
      toast("all field are required", "error");
      return;
    }
    try {
      const user = await checkUserEmail(data.email);
      if (user) {
        toast("This email already exist", "info");
        navigate("/signin");
      }
      const doc = collection(db, "user");
      await addDoc(doc, data);
      setIsLoading(false);
      toast("your account successfully created", "success");
      navigate("/signin");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const checkUserEmail = async (email) => {
    try {
      const colRef = collection(db, "user");
      const q = query(colRef, where("email", "==", email));
      const user = await getDocs(q);
      const users = user.docs;

      const data = users.map((user) => {
        return { users: user.data(), usersId: user.id };
      });
      return data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (data) => {
    setIsLoading(true);
    if (!data.email || !data.password) {
      toast("email and password are required", "error");
      return;
    }
    try {
      let { users, usersId } = await checkUserEmail(data.email);
      let user = { ...users, id: usersId };
      setIsLoading(false);
      if (!user) {
        toast("email or password is invalid ", "error");
      } else {
        const randChar = Math.random()
          .toString(36)
          .substring(2, 2 + 50);
        localStorage.setItem("token", randChar);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
 





  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
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
