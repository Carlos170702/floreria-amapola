import { toast } from "react-hot-toast";
import { apiQueries } from "../../../api/ApiQueries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // funcion que hace el registro del nuevo usuario
  const handleRegister = async (dataUser) => {
    setIsLoading(true);
    try {
      // se hace la petición a la api y te da los resultados tambien se le manda los datos de creacion de usuario
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

      // guarda el token en localStorage de lo q regreso la peticion
      localStorage.setItem("token", JSON.stringify(data.message));
      toast.success("Usuario registrado", { duration: 2000 });

      // si se ejecuta todo bien te manda a login y valida el token
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
