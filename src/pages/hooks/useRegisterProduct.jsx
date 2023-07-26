import { useEffect, useState } from "react";
import { apiQueries } from "../../api/ApiQueries";
import { toast } from "react-hot-toast";

export const useRegisterProduct = () => {
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeUpdate, setActiveUpdate] = useState(false);

  // Función para obtener la lista de colores desde la API
  const getColors = async () => {
    try {
      // Realiza una consulta a la API para obtener la lista de colores de productos
      const { data } = await apiQueries("getColors");

      // Si hay un error en la respuesta de la API, muestra un mensaje de error
      if (data?.error) {
        return toast.error("Error no hay colores de rosas");
      }

      // Actualiza el estado 'colors' con los datos obtenidos
      setColors(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para obtener la lista de tipos de productos desde la API
  const getTypes = async () => {
    try {
      // Realiza una consulta a la API para obtener la lista de tipos de productos
      const { data } = await apiQueries("/getTypes");

      // Si hay un error en la respuesta de la API, muestra un mensaje de error
      if (data?.error) {
        return toast.error("Error no hay tipos");
      }

      // Actualiza el estado 'types' con los datos obtenidos
      setTypes(data?.message);
    } catch (error) {
      // Si ocurre un error durante la consulta a la API, muestra un mensaje de error y lo registra en la consola
      toast.error("Error de el servidor");
      console.log(error);
    }
  };

  useEffect(() => {
    getColors();
    getTypes();
  }, []);

  // Función para subir una imagen a Cloudinary y obtener la URL segura de la imagen subida
  const uploadImage = async (image) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "floreria-amapola");

    try {
      // Realiza una solicitud POST a la API de Cloudinary para subir la imagen
      const { data } = await apiQueries.post(
        "https://api.cloudinary.com/v1_1/carlosdaniel/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Muestra un mensaje de éxito al subir la imagen y retorna la URL segura de la imagen subida
      toast.success("Imagen subida correctamente");
      return data?.secure_url;
    } catch (error) {
      // Si ocurre un error al subir la imagen, muestra un mensaje de error y lo registra en la consola
      setLoading(false);
      toast.error("Error del servidor");
      console.log(error);
      return;
    }
  };

  // Función para agregar un nuevo producto a la API
  const addProduct = async (dataProducto, reset) => {
    try {
      // Sube la imagen del producto a Cloudinary y obtiene la URL segura de la imagen subida
      const URL_IMAGE = await uploadImage(dataProducto?.imageURL[0]);

      // Crea un nuevo objeto con los datos del producto y la URL de la imagen subida
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

      // Realiza una solicitud POST a la API para agregar el nuevo producto
      const { data } = await apiQueries.post("addProduct", newProduct);

      // Si hay un error en la respuesta de la API, muestra un mensaje de error
      if (data?.error) {
        setLoading(false);
        return toast.error("Producto no pudo ser guardado");
      }

      // Muestra un mensaje de éxito al agregar el producto y actualiza la lista de productos
      toast.success("Producto agregado correctamente");
      getProducts();
      reset();
      setLoading(false);
    } catch (error) {
      // Si ocurre un error durante la solicitud a la API, muestra un mensaje de error y lo registra en la consola
      setLoading(false);
      console.log(error);
      toast.error("Error del servidor");
    }
  };

  // lo que hace esto es una peticion a la api
  const getProducts = async () => {
    try {
      // esto ta da la respuesta de la peticion
      const { data } = await apiQueries("/getProducts");

      // si ocurre un error te manda una alerta
      if (data?.error) {
        return toast.error("Error");
      }

      // actualiza el estado 'products' con los datos obtenidos
      setProducts(data?.message);
    } catch (error) {
      // si ocurre un error te manda una alerta
      toast.error("error");
      console.log(error);
    }
  };

  // se ejcuta al cargar el componente y te ejecuta la funcion de obtener flores
  useEffect(() => {
    getProducts();
  }, []);

  // funcion que sirve para eliminar flores de los productos existentes
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
        setLoading(false);
        return toast.error("Error al actualizar producto");
      }

      toast.success(data?.message);
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
