import { useEffect, useState } from "react";
import { apiQueries } from "../../api/ApiQueries";
import { toast } from "react-hot-toast";

export const useRegistrProvider = () => {
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([null]);
  const [updateActive, setUpdateActive] = useState(false);

  // obtener todos los proveedores
  const getProviders = async () => {
    setLoading(true);
    try {
      const { data } = await apiQueries("/getProviders");

      if (data?.error) {
        setLoading(false);
        return toast.error("Ocurrio un error");
      }

      setTimeout(() => {
        setProviders(data?.message);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProviders();
  }, []);

  const updateProviders = (id) => {
    const newDataProviders = providers.filter(
      (provider) => provider.CvProveedor !== id
    );

    setProviders(newDataProviders);
  };

  // Agregar nuevoo proveedor
  const addProvider = async (dataProvider, reset) => {
    const newProvider = {
      Telefono: dataProvider?.Telefono,
      ApePaterno: dataProvider?.Encargado,
      ApeMaterno: dataProvider?.ApeMaterno,
      Nombre: dataProvider?.Nombre,
      RFC: dataProvider?.RFC,
      Correo: dataProvider?.Correo,
      CvDireccion: 1,
    };

    try {
      const { data } = await apiQueries.post("AddProvider", newProvider);

      if (data.error) {
        console.log(data?.message);
        setLoading(false);
        return toast.error("Ocurrio un error");
      }

      toast.success("Proveedor agregado");
      setLoading(false);
      reset();
      getProviders();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Ocurrio un error servidor provider");
    }
  };

  // añadir direccion
  const addDIrection = async (dataProvider, reset) => {
    setLoading(true);
    const newDirection = {
      NumCas: dataProvider?.NumCas,
      Calle: dataProvider?.Calle,
      CvCiudad: dataProvider?.CvCiudad,
      CvEstado: dataProvider?.CvEstado,
      CvPais: dataProvider?.CvPais,
    };

    try {
      const { data } = await apiQueries.post("/addDirection", newDirection);

      if (data?.error) {
        toast.error("Error al agregar proveedor");
        return setLoading(false);
      }

      toast.success("Direccion correcta");
      addProvider(dataProvider, reset);
    } catch (error) {
      toast.error("Error del servidor direccion");
      setLoading(false);
      console.log(error);
    }
  };

  const handleupdateActive = (active) => {
    setUpdateActive(active);
  };

  const updateDataProvider = async (
    newDataProvider,
    handleupdateActive,
    reset
  ) => {
    const newData = {
      Telefono: newDataProvider?.Telefono,
      ApePaterno: newDataProvider?.ApePaterno,
      ApeMaterno: newDataProvider?.ApeMaterno,
      Nombre: newDataProvider?.Nombre,
      RFC: newDataProvider?.RFC,
      Correo: newDataProvider?.Correo,
      CvProveedor: newDataProvider?.CvProveedor,
    };
    try {
      const { data } = await apiQueries.post("/updateProvider", newData);

      if (data?.error) {
        setLoading(false);
        return toast.error("Proveedor no actualizado");
      }

      handleupdateActive(false);
      reset();
      getProviders();
      toast.success("Proveedor Actualizado");

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error del servidor");
    }
  };

  // actualizar direccion del proveedor
  const updateDirection = async (
    newDataDireccion,
    handleupdateActive,
    reset
  ) => {
    setLoading(true);
    const newInfo = {
      NumCas: newDataDireccion?.NumCas,
      Calle: newDataDireccion?.Calle,
      CvCiudad: newDataDireccion?.CvCiudad,
      CvEstado: newDataDireccion?.CvEstado,
      CvPais: newDataDireccion?.CvPais,
      CvDireccion: newDataDireccion?.CvDireccion,
    };

    try {
      const { data } = await apiQueries.post("/updateDirection", newInfo);

      if (data.error) {
        setLoading(false);
        return toast.error("Error al alcualizar los datos");
      }

      toast.success("Direccion actualizada correctamente");
      updateDataProvider(newDataDireccion, handleupdateActive, reset);
    } catch (error) {
      toast.error("Error al alcualizar los datos direccion");
      console.log(error);
      setLoading(false);
    }
  };

  return {
    // properties
    providers,
    loading,
    updateActive,
    // methods
    addDIrection,
    updateProviders,
    handleupdateActive,
    updateDirection,
  };
};
