import { useState } from "react";

export const useForm = (values = {}) => {
  const [formState, setFormState] = useState(values);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onReset = (data) => {
    setFormState(data);
  };

  return {
    // properties
    formState,
    // methods
    onInputChange,
    onReset,
  };
};
