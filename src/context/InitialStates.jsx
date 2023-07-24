import { useReducer, useState } from "react";
import { UseContex } from "./UseContex";
import UseReduc from "./UseReduc";
import { apiQueries } from "../api/ApiQueries";
import { toast } from "react-hot-toast";
import {
  ADD_TO_CAR,
  GET_FLOWERS,
  LOGIN,
  REMOVE_FROM_CAR,
  RESET,
  SELECT_FLOWER,
  UPDATE_USER,
} from "./types";
import { useNavigate } from "react-router-dom";

export const InitialStates = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialState = {
    logged: false,
    dataUser: null,
    allFlowers: [],
    flowerSelected: null,
    car: [],
  };

  const [state, dispatch] = useReducer(UseReduc, initialState);

  //login
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

  // validar Token
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
    localStorage.clear();
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

  const handleSelectFlower = (flowerSelected) => {
    dispatch({
      type: SELECT_FLOWER,
      payload: flowerSelected,
    });
  };

  const addCar = (flower) => {
    dispatch({
      type: ADD_TO_CAR,
      payload: flower,
    });
  };

  const deleteCar = (flower) => {
    dispatch({
      type: REMOVE_FROM_CAR,
      payload: flower,
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
        validToken,
        handleSelectFlower,
        addCar,
        deleteCar,
      }}
    >
      {children}
    </UseContex.Provider>
  );
};
