import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginSrv from "../pages/login/LoginSrv";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
    setLoading(false);
  }, []);

  const login = (credenciais) => {
    LoginSrv.login(credenciais).then((response) => {
      let token = response.data.token;
      let userId = response.data.userId;
      let userNome = response.data.userNome;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("userId", JSON.stringify(userId));
      localStorage.setItem("userNome", JSON.stringify(userNome));
      navigate("/");
      const loggedUser = response.data;
      localStorage.setItem("user", JSON.stringify(loggedUser));

      setUser(loggedUser);
      navigate("/");
    });
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userNome");
    setUser(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
