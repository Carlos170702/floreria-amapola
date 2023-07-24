import { useContext, useEffect, useState } from "react";
import { apiQueries } from "../../api/ApiQueries";
import { UseContex } from "../../context/UseContex";

export const useFlowerCar = () => {
  const [tipoPago, setTipoPago] = useState([]);
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [date, setDate] = useState(null);

  const { car } = useContext(UseContex);

  const getTipoPago = async () => {
    try {
      const { data } = await apiQueries("/getTipoPago");

      setTipoPago(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTipoPago();
    getDate();
  }, []);

  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const flower of car) {
      subtotal += flower.PreVenta * flower.quantity;
    }
    setSubtotal(subtotal.toFixed(2));
  };

  const calculateIva = () => {
    const iva = subtotal * 0.2;
    setIva(iva.toFixed(2));
  };

  const calculateTotal = () => {
    const amountTotal = parseFloat(subtotal) + parseFloat(iva);

    setTotal(amountTotal.toFixed(2));
  };

  const getDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    setDate(formattedDate);
  };

  useEffect(() => {
    calculateSubtotal();
  }, [car]);

  useEffect(() => {
    calculateIva();
  }, [subtotal]);

  useEffect(() => {
    calculateTotal();
  }, [iva]);

  console.log(car)

  return {
    // properties
    tipoPago,
    car,
    subtotal,
    iva,
    total,
    date,
    // methods
  };
};
