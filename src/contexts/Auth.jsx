import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const Auth = ({ children }) => {
  const [token, setToken] = useState(localStorage.token);
  const [username, setUsername] = useState(localStorage.username);

  const login = async (myUsername, myPassword) => {
    const url = "http://localhost:5000/api/v1/users/login";
    try {
      const response = await axios.post(url, {
        username: myUsername,
        password: myPassword,
      });
      const { token, username } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setToken(token);
      setUsername(username);
      return null;

    } catch (error) {
      // console.log(error)
      return error;
    }
  };

  const signup = async (myUsername, myEmail, myPassword) => {
    const url = "http://localhost:5000/api/v1/users/signup";
    try {
      const response = await axios.post(url, {
        username: myUsername,
        email: myEmail,
        password: myPassword,
      });
      // console.log(response)
      return response;

    } catch (error) {
      // console.log(error.response.data)
      return error.response;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  };

  const isAuthenticated = () => {
    return token!=null;
  };

  const handleReload = () => {
    window.location.reload();
  };

  const auth = useMemo(() => ({
    token,
    username,
    login,
    signup,
    logout,
    isAuthenticated,
    handleReload
  }),[token]);

  return (
    <>
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    </>
  );
};