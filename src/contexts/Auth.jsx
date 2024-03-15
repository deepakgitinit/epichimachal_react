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
    const url = "http://localhost:5000/api/v1/users/login";
    try {
      const response = await axios.post(url, {
        email: myEmail,
        password: myPassword,
      });

      const receivedToken = response.data.message;
      const profile = "http://localhost:5000/" + response.data.profile;
      const role = response.data.role;

      localStorage.setItem("token", receivedToken );
      localStorage.setItem("profile", profile)
      localStorage.setItem("role", role)
      
      setToken(receivedToken);
      setProfileImg(profile)
      setRole(role)

      return response;

    } catch (error) {
      return error.response;
    }
  };

  const signup = async (myEmail, myPassword, mychecked) => {
    const url = "http://localhost:5000/api/v1/users/signup";
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
    const url = "http://localhost:5000/api/v1/users/update"
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