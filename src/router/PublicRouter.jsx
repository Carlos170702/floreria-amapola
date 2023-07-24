import { useContext, useEffect } from "react";
import { UseContex } from "../context/UseContex";
import { useNavigate } from "react-router-dom";

export const PublicRouter = ({ children }) => {
  const navigate = useNavigate();
  const { logged, validToken } = useContext(UseContex);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      validToken(token);
    }
  }, []);

  useEffect(() => {
    if (logged) {
      navigate("/");
      return;
    }
  }, []);

  return children;
};
