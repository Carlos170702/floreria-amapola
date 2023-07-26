import { toast } from "react-hot-toast";
import { apiQueries } from "../../api/ApiQueries";

export const Provider = ({
  dataProvider,
  updateProviders,
  activeUpdateProvider,
}) => {
  const deleteProvider = async (id) => {
    // Se envía una solicitud a la API para eliminar el proveedor con el ID especificado
    try {
      const { data } = await apiQueries.delete(`/deleteProvider/${id}`);

      // Si la respuesta de la API contiene un error, muestra un mensaje de error
      if (data?.error) {
        return toast.error("Proveedor no encontrado");
      }

      // Si la eliminación es exitosa, actualiza el estado de los proveedores para reflejar los cambios en la interfaz
      updateProviders(id);
      // Muestra un mensaje de éxito cuando el proveedor se ha eliminado correctamente
      toast.success("Proveedor eliminado");
    } catch (error) {
      // Si ocurre un error al comunicarse con el servidor, muestra un mensaje de error
      toast.error("Error de servidor");
      console.log(error);
    }
  };
  return (
    <tr className="text-center">
      <td className="border text-xs px-1">{dataProvider?.CvProveedor}</td>
      <td className="border text-xs px-1">{dataProvider?.Nombre}</td>
      <td className="border text-xs px-1">{dataProvider?.ApePaterno}</td>
      {/* <td className="border tex px-1t-xs">{dataProvider?.ApeMaterno}</td> */}
      <td className="border text-xs px-1">{dataProvider?.Correo}</td>
      <td className="border text-xs px-1">{dataProvider?.Telefono}</td>
      <td className="border text-xs px-1">{dataProvider?.RFC}</td>
      <td className="border text-xs px-1">{dataProvider?.Calle}</td>
      <td className="border text-xs px-1">{dataProvider?.NumCas}</td>
      <td className="border text-xs px-1">{dataProvider?.DsEstado}</td>
      <td className="border text-xs px-1">{dataProvider?.DsCiudad}</td>
      <td className="border text-xs px-1">{dataProvider?.DsPais}</td>
      <td className="border text-xs flex gap-1">
        <button
          className=" p-2 px-3 bg-red-400 text-white rounded uppercase cursor-pointer"
          onClick={() => deleteProvider(dataProvider?.CvProveedor)}
        >
          Eliminar
        </button>
        <button
          className=" p-2 px-3 bg-indigo-500 text-white rounded uppercase cursor-pointer"
          onClick={() => activeUpdateProvider(dataProvider)}
        >
          Editar
        </button>
      </td>
    </tr>
  );
};
