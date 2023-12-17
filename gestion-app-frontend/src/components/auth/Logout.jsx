import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";

export const Logout = () => {
  const { setAuth } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setAuth({});
    navigate("/");
  }, []);

  return <h1>Cerrando Sesion...</h1>;
};
