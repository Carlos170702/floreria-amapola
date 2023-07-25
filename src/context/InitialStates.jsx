// Importar los módulos necesarios desde React
import { useReducer, useState } from "react";
// Importar el componente UseContex y la función UseReduc desde archivos locales
import { UseContex } from "./UseContex";
import UseReduc from "./UseReduc";
// Importar las consultas a la API desde el archivo ApiQueries
import { apiQueries } from "../api/ApiQueries";
// Importar la función 'toast' para mostrar mensajes de notificación en la interfaz
import { toast } from "react-hot-toast";
// Importar las constantes de acción desde el archivo types
import {
  ADD_TO_CAR,
  DELETE_ALL_CAR,
  GET_FLOWERS,
  LOGIN,
  REMOVE_FROM_CAR,
  RESET,
  SELECT_FLOWER,
  UPDATE_USER,
} from "./types";
// Importar el hook 'useNavigate' desde React Router DOM
import { useNavigate } from "react-router-dom";
// Definir el componente 'InitialStates' que será un proveedor de contexto para la aplicación
export const InitialStates = ({ children }) => {
  // Estado local para controlar el estado de carga de la aplicación
  const [loading, setLoading] = useState(false);
  // Obtener la función 'navigate' para realizar redirecciones de navegación
  const navigate = useNavigate();
  // Definir el estado inicial de la aplicación
  const initialState = {
    logged: false,
    dataUser: null,
    allFlowers: [],
    flowerSelected: null,
    car: [],
  };
  // Utilizar el hook 'useReducer' para gestionar el estado de la aplicación, usando el reducer 'UseReduc'
  const [state, dispatch] = useReducer(UseReduc, initialState);

  // Función 'login' para gestionar el proceso de inicio de sesión del usuario
  const login = async (
    dataUSer = { user: "DONT_SEND_USER", password: "DONT_SEND_PASSWORD" }
  ) => {
    setLoading(true);
    try {
      const { data } = await apiQueries.post(`/login`, {
        User: dataUSer.user,
        Password: dataUSer.password,
      });

      if (data?.error) {
        setLoading(false);
        return toast.error(data?.message, {
          duration: 1000,
        });
      }

      // Guardar el token en localStorage
      localStorage.setItem("token", JSON.stringify(data?.message?.token));

      const newData = {
        logged: true,
        dataUser: data.message,
      };

      dispatch({
        type: LOGIN,
        payload: newData,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
      return;
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  // Función 'validToken' para validar el token del usuario con la API
  const validToken = async (token) => {
    setLoading(true);
    try {
      const { data } = await apiQueries.post(
        "/validarToken",
        {},
        {
          headers: {
            "x-token": JSON.parse(token),
          },
        }
      );

      if (data?.error) {
        setLoading(false);
        return toast.success(data?.message);
      }

      const newData = {
        logged: true,
        dataUser: data.message,
      };

      dispatch({
        type: LOGIN,
        payload: newData,
      });

      navigate("/");
      setLoading(false);
      return;
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  // Función 'getFlowers' para obtener la lista de flores desde la API
  const getFlowers = async () => {
    setLoading(true);
    try {
      const { data } = await apiQueries("/getFlowers");

      if (data?.error) {
        return setLoading(false);
      }

      const newData = {
        allFlowers: data.message,
      };

      dispatch({
        type: GET_FLOWERS,
        payload: newData,
      });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Función 'reset' para limpiar el almacenamiento local y restablecer el estado a su valor inicial
  const reset = () => {
    localStorage.clear();
    dispatch({
      type: RESET,
      payload: initialState,
    });
  };

  // Función 'updateUser' para actualizar los datos del usuario en el estado
  const updateUser = (newDataUser) => {
    dispatch({
      type: UPDATE_USER,
      payload: newDataUser,
    });
  };

  // Función 'handleSelectFlower' para actualizar la flor seleccionada en el estado
  const handleSelectFlower = (flowerSelected) => {
    dispatch({
      type: SELECT_FLOWER,
      payload: flowerSelected,
    });
  };

  // Función 'addCar' para agregar una flor al carrito en el estado
  const addCar = (flower) => {
    dispatch({
      type: ADD_TO_CAR,
      payload: flower,
    });
  };

  // Función 'deleteCar' para eliminar una flor del carrito en el estado
  const deleteCar = (flower) => {
    dispatch({
      type: REMOVE_FROM_CAR,
      payload: flower,
    });
  };

  // Función 'deleteAllCar' para eliminar todas las flores del carrito en el estado
  const deleteAllCar = () => {
    dispatch({
      type: DELETE_ALL_CAR,
      payload: [],
    });
  };

  // Devolver el proveedor de contexto (UseContex.Provider) con los valores y métodos que estarán disponibles para los componentes hijos
  return (
    <UseContex.Provider
      value={{
        // properties
        ...state,
        loading,
        //  methods
        login,
        getFlowers,
        reset,
        updateUser,
        validToken,
        handleSelectFlower,
        addCar,
        deleteCar,
        deleteAllCar,
      }}
    >
      {children}
    </UseContex.Provider>
  );
};
