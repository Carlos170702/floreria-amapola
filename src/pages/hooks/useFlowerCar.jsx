import { useContext, useEffect, useState } from "react";
import { apiQueries } from "../../api/ApiQueries";
import { UseContex } from "../../context/UseContex";
import { toast } from "react-hot-toast";

export const useFlowerCar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoPago, setTipoPago] = useState([]);
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [date, setDate] = useState(null);
  const [tipoPagoSelected, setTipoPagoSelected] = useState(0);

  const { car, dataUser, deleteAllCar } = useContext(UseContex);

  // Obtener los tipos de pago disponibles
  const getTipoPago = async () => {
    try {
      const { data } = await apiQueries("/getTipoPago");

      setTipoPago(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Cuando el componente se monta, obtener los tipos de pago disponibles
    getTipoPago();
    getDate();
  }, []);

  // Calcular el subtotal sumando los precios de las flores en el carrito
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const flower of car) {
      subtotal += flower.PreVenta * flower.quantity;
    }
    setSubtotal(subtotal.toFixed(2));
  };

  // Calcular el IVA multiplicando el subtotal por 0.16 (16%)
  const calculateIva = () => {
    const iva = subtotal * 0.16;
    setIva(iva.toFixed(2));
  };

  const calculateTotal = () => {
    const amountTotal = parseFloat(subtotal) + parseFloat(iva);

    setTotal(amountTotal.toFixed(2));
  };

  // Obtener la fecha actual y formatearla como "yyyy-mm-dd"
  const getDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  };

  // Cuando se actualiza el carrito de compras, recalcular el subtotal
  useEffect(() => {
    calculateSubtotal();
  }, [car]);

  // Cuando se actualiza el subtotal, recalcular el IVA
  useEffect(() => {
    calculateIva();
  }, [subtotal]);

  // Cuando se actualiza el IVA, recalcular el total
  useEffect(() => {
    calculateTotal();
  }, [iva]);

  // Actualizar el estado tipoPagoSelected cuando el usuario selecciona un tipo de pago
  const handleChangeTipoPago = (e) => {
    setTipoPagoSelected(e.target.value);
  };

  // Realizar la venta enviando los detalles a la API
  const makeSale = async () => {
    setIsLoading(true);
    const dataSale = {
      Subtotal: subtotal,
      Iva: iva,
      Total: total,
      FechaVenta: date,
      CvUsuario: dataUser?.CvUsuarios,
      CvTipoDePago: tipoPagoSelected,
      flowers: car.map((flower) => {
        return {
          Subtotal: flower?.PreVenta * flower.quantity,
          Total: flower?.PreVenta * flower.quantity,
          Cantidad: flower.quantity,
          CvInventario: flower.CvInventario,
        };
      }),
    };

    try {
      // Validar que se haya seleccionado un tipo de pago
      if (tipoPagoSelected == 0) {
        setIsLoading(false);
        return toast("Selecciona un tipo de pago", {
          icon: "👍",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      // Realizar la consulta a la API para realizar la venta
      const { data } = await apiQueries.post("/addToVenta", dataSale);

      if (data?.error) {
        setIsLoading(false);
        return toast.error(data?.message);
      }

      // Mostrar mensaje de éxito y vaciar el carrito de compras
      setTimeout(() => {
        setIsLoading(false);
        toast.success(data?.message);
        deleteAllCar();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return {
    // properties
    tipoPago,
    car,
    subtotal,
    iva,
    total,
    date,
    isLoading,
    // methods
    handleChangeTipoPago,
    makeSale,
  };
};
