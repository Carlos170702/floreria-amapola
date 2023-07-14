import { useReducer, useState } from "react";
import { UseContex } from "./UseContex";
import UseReduc from "./UseReduc";
import { apiQueries } from "../api/ApiQueries";
import { toast } from "react-hot-toast";
import { GET_FLOWERS, LOGIN, RESET, UPDATE_USER } from "./types";
import { useNavigate } from "react-router-dom";

export const InitialStates = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialState = {
    logged: false,
    dataUser: null,
    allFlowers: null,
  };

  const [state, dispatch] = useReducer(UseReduc, initialState);

  //obtener los usuario
  const login = async (
    dataUSer = { user: "DONT_SEND_USER", password: "DONT_SEND_PASSWORD" }
  ) => {
    const { password, user } = dataUSer;
    setLoading(true);
    try {
      const { data } = await apiQueries(`/getusuario/${user}`);

      if (data?.error) {
        setLoading(false);
        return toast.error("Usuario no encontrado", {
          duration: 1000,
        });
      }

      if (data?.message?.contrasena !== password) {
        setLoading(false);
        return toast.error("Contraseña incorrecta", {
          duration: 1000,
        });
      }

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

  // obtener las flores
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

  // retablecer todo
  const reset = () => {
    dispatch({
      type: RESET,
      payload: initialState,
    });
  };

  const updateUser = (newDataUser) => {
    dispatch({
      type: UPDATE_USER,
      payload: newDataUser,
    });
  };

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
      }}
    >
      {children}
    </UseContex.Provider>
  );
};
