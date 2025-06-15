import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  


  useEffect(() => {
    // when refreshing the page, check if user is logged in and token is still valid
    getUserInfo();
  }, []);
  
  const getUserInfo = async () => {
    try {
        const res = await makeRequest.get("/auth");
        setCurrentUser(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
          console.log("Vous n'avez pas les autorisations nécessaires");
      } else if (error.response && error.response.status === 403) {
          console.log("Vous n'avez pas les autorisations nécessaires");
      }
      setCurrentUser(null);
  }
};

  const login = async (inputs) => {
    try {
      const res = await makeRequest.post("/auth/login", inputs);
      setCurrentUser(res.data);
    } catch (error) {
      throw error; // Re-throw the error
    }
  };

  const logout = async () => {
    try {
      await makeRequest.post("/auth/logout");
      setCurrentUser(null);

      // Effacer le cookie d'authentification
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=none";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };



  return (
    <AuthContext.Provider value={{ currentUser, login, logout, /* getUserInfo */ }}>
      {children}
    </AuthContext.Provider>
  );
};
