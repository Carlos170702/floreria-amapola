import { useContext, useEffect, useState } from "react";
import { UseContex } from "../../context/UseContex";
import { apiQueries } from "../../api/ApiQueries";
import { useForm } from "../../hooks/useForm";

export const useMenuProductos = () => {
  const [colors, setColors] = useState(null);
  const { getFlowers, allFlowers, loading, flowerSelected } =
    useContext(UseContex);
  const [flowersFilter, setFlowersFilter] = useState();
  const { formState, onInputChange } = useForm({
    Nombre: "",
    Precio: 0,
    Color: "",
  });

  // obtiene los datos de las flores
  const onGetFlowers = () => {
    getFlowers();
  };

  // obtener los colores de las flores
  const onGetColors = async () => {
    const { data } = await apiQueries("/getColors");

    if (data?.error) {
      return;
    }
    setColors(data?.message);
  };

  // esto es para filtrar los datos de las flores
  const filtrarFlores = () => {
    let flowerFilter = [...allFlowers];

    if (formState?.Nombre.length > 0) {
      flowerFilter = flowerFilter?.filter((flor) => {
        const nombreCoincide = flor.Nombre.toLowerCase().includes(
          formState?.Nombre?.toLowerCase()
        );
        return nombreCoincide;
      });
    }

    if (formState.Color.length > 0) {
      flowerFilter = flowerFilter?.filter((flor) => {
        const colorCoinciden = flor.Color.toLowerCase().includes(
          formState.Color.toLowerCase()
        );
        return colorCoinciden;
      });
    }

    if (formState.Precio > 0) {
      flowerFilter = flowerFilter?.filter((flor) => {
        const precioConciden = flor?.PreVenta < formState.Precio;

        return precioConciden;
      });
    }

    // Actualizar el estado flowersFilter con los resultados del filtrado
    setFlowersFilter(flowerFilter);
  };

  useEffect(() => {
    filtrarFlores({ ...formState });
  }, [formState]);

  useEffect(() => {
    onGetFlowers();
  }, []);

  useEffect(() => {
    onGetColors();
  }, []);

  return {
    // properties
    loading,
    allFlowers,
    colors,
    formState,
    flowersFilter,
    flowerSelected,
    // methods
    onInputChange,
  };
};
