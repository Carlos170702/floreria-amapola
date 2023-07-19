import { useEffect, useState } from "react";
import { apiQueries } from "../../api/ApiQueries";
import { toast } from "react-hot-toast";

export const useRegisterProduct = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);

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
  const uploadImage = async (dataProduct, reset) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", dataProduct?.imageURL[0]);
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

      const newData = { ...dataProduct, imageURL: data?.secure_url };
      addProduct(newData, reset);
      toast.success("Imagen subida correctamente");
      setLoading(false);
    } catch (error) {
      toast.error("Error del servidor");
      console.log(error);
    }
  };

  const addProduct = async (newDataProduct, reset) => {
    const newProduct = {
      imageURL: newDataProduct?.imageURL,
      Caracteristicas: newDataProduct?.Caracteristicas,
      Nombre: newDataProduct?.Nombre,
      CvColor: newDataProduct?.CvColor,
      CvTipo: newDataProduct?.CvTipo,
      Existencia: newDataProduct?.Existencia,
      Stock: newDataProduct?.Stock,
      PreVenta: newDataProduct?.PreVenta,
      Preccompra: newDataProduct?.Preccompra,
    };

    try {
      const { data } = await apiQueries.post("addProduct", newProduct);

      if (data?.error) {
        setLoading(false);
        return toast.error("Producto no pudo ser guardado");
      }

      toast.success("Producto agregado correctamente");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Error del servidor");
    }
  };

  const handleImageSelected = (image) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSelected(reader.result);
    };
    reader.readAsDataURL(image);
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

  const deleteProduct = (id) => {
    try {
      const { data } = apiQueries.delete(`/deleteProduct/${id}`);

      console.log(data)
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }

    const newProducts = products.filter(
      (product) => product.CvInventario != id
    );

    setProducts(newProducts);
  };

  return {
    // properties
    colors,
    types,
    imageSelected,
    loading,
    products,
    // methods
    uploadImage,
    handleImageSelected,
    deleteProduct,
  };
};
