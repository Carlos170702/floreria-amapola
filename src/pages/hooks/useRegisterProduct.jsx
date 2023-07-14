import { useEffect, useState } from "react";
import { apiQueries } from "../../api/ApiQueries";
import { toast } from "react-hot-toast";

export const useRegisterProduct = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);

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
  const uploadImage = async (dataProduct) => {
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
      addProduct(newData);
      toast.success("Imagen subida correctamente");
      setLoading(false);
    } catch (error) {
      toast.error("Error del servidor");
      console.log(error);
    }
  };

  const addProduct = async (newDataProduct) => {
    const newProduct = {
      imageURL: newDataProduct?.imageURL,
      Caracteristicas: newDataProduct?.Caracteristicas,
      Nombre: newDataProduct?.Nombre,
      CvColor: newDataProduct?.CvColor,
      CvTipo: newDataProduct?.CvTipo,
    };

    try {
      const { data } = await apiQueries.post("addProduct", newProduct);

      if (data?.error) {
        setLoading(false);
        return toast.error("Producto no pudo ser guardado");
      }

      toast.success("Producto agregado correctamente");
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

  return {
    // properties
    colors,
    types,
    imageSelected,
    loading,
    // methods
    uploadImage,
    handleImageSelected,
  };
};
