import { useContext, useEffect } from "react";
import { UseContex } from "../context/UseContex";
import { useNavigate } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const navigate = useNavigate();
  const { logged } = useContext(UseContex);

  useEffect(() => {
    if (!logged) {
      navigate("/login");
      return;
    }
  }, []);

  return children;
};
