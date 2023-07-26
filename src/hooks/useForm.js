// Importar el módulo 'useState' desde React
import { useState } from "react";

// Definir una función personalizada 'useForm' que toma un objeto 'values' como argumento con un valor por defecto de un objeto vacío ({})
export const useForm = (values = {}) => {
  // Utilizar el hook 'useState' para crear un estado local 'formState' con los valores iniciales pasados como argumento
  const [formState, setFormState] = useState(values);

  // Definir una función 'onInputChange' que actualiza el estado 'formState' cuando un campo del formulario cambia
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Definir una función 'onReset' que restablece el estado 'formState' a los valores pasados como argumento
  const onReset = (data) => {
    setFormState(data);
  };

  // Devolver un objeto que contiene el estado 'formState', la función 'onInputChange' y la función 'onReset'
  return {
    // properties
    formState,
    // methods
    onInputChange,
    onReset,
  };
};
