import { useContext, useState } from "react";
import { UseContex } from "../../context/UseContex";
import { apiQueries } from "../../api/ApiQueries";
import { toast } from "react-hot-toast";

export const usePerfil = () => {
  const { dataUser, updateUser } = useContext(UseContex);
  const [loading, setLoading] = useState(false);

  // se actualiza los datos generales de usuario a la base de datos
  const onUpdateUser = async (newData) => {
    try {
      setLoading(true);
      const { data } = await apiQueries.post("/updateUser", newData);

      if (data.error) {
        setLoading(false);
        return toast.error("Error al alcualizar los datos");
      }

      updateDirection(newData);
    } catch (error) {
      toast.error("Error al alcualizar los datos usuario");
      console.log(error);
      setLoading(false);
    }
  };

  // se actualiza los datos de direccion de la base de datos
  const updateDirection = async (newData) => {
    const newInfo = {
      NumCas: newData?.NumCas,
      Calle: newData?.Calle,
      CvCiudad: newData?.CvCiudad,
      CvEstado: newData?.CvEstado,
      CvPais: newData?.CvPais,
      CvDireccion: dataUser?.CvDireccion,
    };

    try {
      const { data } = await apiQueries.post("/updateDirection", newInfo);

      if (data.error) {
        setLoading(false);
        return toast.error("Error al alcualizar los datos");
      }

      setTimeout(() => {
        toast.success("Actualizado correctamente");
        updateUser(newData);
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("Error al alcualizar los datos direccion");
      console.log(error);
      setLoading(false);
    }
  };

  const actualizarData = (data) => {
    onUpdateUser({ ...dataUser, ...data });
  };

  return {
    // properties
    loading,
    dataUser,
    // methods
    updateUser,
    actualizarData,
  };
};
