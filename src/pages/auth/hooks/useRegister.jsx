import { toast } from "react-hot-toast";
import { apiQueries } from "../../../api/ApiQueries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (dataUser) => {
    setIsLoading(true);
    try {
      const { data } = await apiQueries.post("/addUser", {
        ...dataUser,
        Contrasena: dataUser?.Contraseña,
        CvRol: 2,
      });

      if (data.error) {
        setIsLoading(false);
        setIsLoading(false);
        return toast.error(data.message);
      }

      localStorage.setItem("token", JSON.stringify(data.message));
      toast.success("Usuario registrado", { duration: 2000 });

      setTimeout(() => {
        navigate("/");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return {
    // properties
    isLoading,
    // methods
    handleRegister,
  };
};
