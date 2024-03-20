import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const Auth = ({ children }) => {
  const [token, setToken] = useState(localStorage.token);
  const [profileImg, setProfileImg] = useState(localStorage.profile);
  const [role, setRole] = useState(localStorage.role);

  const login = async (myEmail, myPassword) => {
    const url = `${import.meta.env.VITE_LOGIN}`;
    try {
      const response = await axios.post(url, {
        email: myEmail,
        password: myPassword,
      });

      const receivedToken = response.data.message;
      const profile = response.data.profile;
      const role = response.data.role;

      localStorage.setItem("token", receivedToken );
      localStorage.setItem("role", role)
      
      setToken(receivedToken);
      setRole(role)

      if (profile == "" || profile == undefined) {
        localStorage.setItem("profile", "/src/assets/default-avatar-icon.jpg")
        setProfileImg("src/assets/default-avatar-icon.jpg")
      }else{
        localStorage.setItem("profile", `${import.meta.env.VITE_LOCALHOST}/` + profile)
        setProfileImg(`${import.meta.env.VITE_LOCALHOST}/` + profile)
      }

      return response;

    } catch (error) {
      return error.response;
    }
  };

  const signup = async (myEmail, myPassword, mychecked) => {
    const url = `${import.meta.env.VITE_SIGNUP}`;
    try {
      const response = await axios.post(url, {
        email: myEmail,
        password: myPassword,
        subscription: mychecked
      });
      return response;

    } catch (error) {
      return error.response;
    }
  };

  const updateProfile = async (myUserDetails) =>{
    const url = `${import.meta.env.VITE_UPDATE}`
    const token = "Bearer " + localStorage.getItem('token');

    try {
      const response = await axios.post(url, myUserDetails, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": token
        }
      })

      return response;

    } catch (error) {
      return error.response
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile")
    setToken(null);
  };

  const isAuthenticated = () => {
    if(token!=null && token!=undefined){
      return true;
    }
    return false;
  };

  const handleReload = () => {
    window.location.reload();
  };

  const auth = useMemo(() => ({
    token,
    profileImg,
    role,
    setProfileImg,
    login,
    signup,
    updateProfile,
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