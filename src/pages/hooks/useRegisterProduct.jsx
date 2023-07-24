import { useEffect, useState } from "react";
import { apiQueries } from "../../api/ApiQueries";
import { toast } from "react-hot-toast";

export const useRegisterProduct = () => {
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeUpdate, setActiveUpdate] = useState(false);

  //   obtiene los colores
  const getColors = async (colors) => {
    try {
      const { data } = await apiQueries("getColors");

      if (data?.error) {
        return toast.error("Error no hay colores de rosas");
      }

      setColors(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  //   obtiene los tipos
  const getTypes = async () => {
    try {
      const { data } = await apiQueries("/getTypes");

      if (data?.error) {
        return toast.error("Error no hay tipos");
      }

      setTypes(data?.message);
    } catch (error) {
      toast.error("Error de el servidor");
      console.log(error);
    }
  };

  useEffect(() => {
    getColors();
    getTypes();
  }, []);

  //   subir haimage a cloudinary
  const uploadImage = async (image) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "floreria-amapola");

    try {
      const { data } = await apiQueries.post(
        "https://api.cloudinary.com/v1_1/carlosdaniel/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Imagen subida correctamente");
      return data?.secure_url;
    } catch (error) {
      setLoading(false);
      toast.error("Error del servidor");
      console.log(error);
      return;
    }
  };

  // agregar buevo producto
  const addProduct = async (dataProducto, reset) => {
    try {
      const URL_IMAGE = await uploadImage(dataProducto?.imageURL[0]);

      const newProduct = {
        imageURL: URL_IMAGE,
        Caracteristicas: dataProducto?.Caracteristicas,
        Nombre: dataProducto?.Nombre,
        CvColor: dataProducto?.CvColor,
        CvTipo: dataProducto?.CvTipo,
        Existencia: dataProducto?.Existencia,
        Stock: dataProducto?.Stock,
        PreVenta: dataProducto?.PreVenta,
        Preccompra: dataProducto?.PrecCompra,
      };

      const { data } = await apiQueries.post("addProduct", newProduct);

      if (data?.error) {
        setLoading(false);
        return toast.error("Producto no pudo ser guardado");
      }

      toast.success("Producto agregado correctamente");
      getProducts();
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error del servidor");
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await apiQueries("/getProducts");

      if (data?.error) {
        return toast.error("Error");
      }

      setProducts(data?.message);
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const { data } = await apiQueries.delete(`/deleteProduct/${id}`);

      if (data?.error) {
        return toast.error(data?.message);
      }

      toast.success(data?.message);
      const newProducts = products.filter(
        (product) => product.CvInventario != id
      );
      setProducts(newProducts);
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };

  // establecer valores para actualizar
  const setValuesUpdate = (data, setValue) => {
    setActiveUpdate(true);
    setValue("Nombre", data?.Nombre);
    setValue("Existencia", data?.Existencia);
    setValue("Stock", data?.Stock);
    setValue("CvColor", data?.CvColor);
    setValue("CvTipo", data?.CvTipo);
    setValue("Caracteristicas", data?.Caracteristicas);
    setValue("imageURL", data?.imageURL);
    setValue("PreVenta", data?.PreVenta);
    setValue("PrecCompra", data?.PrecCompra);
    setValue("CvInventario", data?.CvInventario);
    setValue("CvProducto", data?.CvProducto);
  };

  // restablecer a valores por defecto
  const resetAll = (reset) => {
    setActiveUpdate(false);
    reset();
  };

  // actualizar datos del producto
  const updateProduct = async (dataProduct, reset) => {
    setLoading(true);
    let URL_IMAGE = null;
    if (typeof dataProduct?.imageURL !== "string") {
      URL_IMAGE = await uploadImage(dataProduct?.imageURL[0]);
    }
    const newDataProduct = {
      imageURL: URL_IMAGE || dataProduct?.imageURL,
      Caracteristicas: dataProduct?.Caracteristicas,
      Nombre: dataProduct?.Nombre,
      CvColor: dataProduct?.CvColor,
      CvTipo: dataProduct?.CvTipo,
      PreVenta: dataProduct?.PreVenta,
      Preccompra: dataProduct?.PrecCompra,
      Existencia: dataProduct?.Existencia,
      Stock: dataProduct?.Stock,
      CvProducto: dataProduct?.CvProducto,
      CvInventario: dataProduct?.CvInventario,
    };
    try {
      const { data } = await apiQueries.post("/updateProduct", newDataProduct);

      if (data?.error) {
        setLoading(false)
        return toast.error("Error al actualizar producto")
      }

      toast.success(data?.message)
      setLoading(false);
      reset();
    } catch (error) {
      setLoading(false);
      toast.error("Error");
      console.log(error);
    }
  };

  return {
    // properties
    colors,
    types,
    loading,
    products,
    activeUpdate,
    // methods
    deleteProduct,
    setValuesUpdate,
    resetAll,
    updateProduct,
    addProduct,
  };
};
