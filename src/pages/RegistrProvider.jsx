import { useForm } from "react-hook-form";
import { Direccion } from "./components/Direccion";
import { NavBar } from "./components/NavBar";
import { useRegistrProvider } from "./hooks/useRegistrProvider";
import { Provider } from "./components/Provider";
import { Loading } from "./components/Loading";

export const RegistrProvider = () => {
  // Desestructurar los valores y funciones proporcionados por el hook personalizado 'useRegistrProvider'
  const {
    providers, // Lista de proveedores
    loading, // Estado de carga
    addDIrection, // Función para agregar dirección
    updateProviders, // Función para actualizar proveedores
    updateActive, // Estado para indicar si hay una actualización en curso
    handleupdateActive, // Función para manejar la actualización activa
    updateDirection, // Función para actualizar dirección
  } = useRegistrProvider();
  // Desestructurar los valores y funciones proporcionados por el hook personalizado 'useForm'
  const {
    register, // Función para registrar campos del formulario
    handleSubmit, // Función para manejar la presentación del formulario
    formState: { errors, defaultValues }, // Estado del formulario y valores predeterminados
    reset, // Función para reiniciar el formulario
    setValue, // Función para establecer el valor de los campos del formulario
  } = useForm({
    defaultValues: {
      // Valores predeterminados para el formulario
      ApeMaterno: "",
      Encargado: "",
      Calle: "",
      Correo: "",
      CvCiudad: "SELECCIONA UNA CIUDAD",
      CvEstado: "SELECCIONA UN ESTADO",
      CvPais: "SELECCIONA UN PAIS",
      Nombre: "",
      NumCas: "",
      RFC: "",
      Telefono: "",
    },
  });

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    // Verificar si hay una actualización en curso ('updateActive' es true)
    updateActive
      ? // Si hay una actualización en curso, llamar a la función 'updateDirection' del hook 'useRegistrProvider'
        // Pasar los datos del formulario, la función para manejar la actualización activa y la función para reiniciar el formulario ('reset')
        updateDirection(data, handleupdateActive, reset)
      : // Si no hay una actualización en curso, llamar a la función 'addDIrection' del hook 'useRegistrProvider'
        // Pasar los datos del formulario y la función para reiniciar el formulario ('reset')
        addDIrection(data, reset);
  };

  // Función para activar la actualización de un proveedor
  const activeUpdateProvider = (data) => {
    // Establecer 'updateActive' en true para indicar que hay una actualización en curso
    handleupdateActive(true);
    // Establecer los valores de los campos del formulario con los datos del proveedor seleccionado
    setValue("ApeMaterno", data?.ApeMaterno);
    setValue("Encargado", data?.ApePaterno);
    setValue("Calle", data?.Calle);
    setValue("Correo", data?.Correo);
    setValue("CvCiudad", data?.CvCiudad);
    setValue("CvEstado", data?.CvEstado);
    setValue("CvPais", data?.CvPais);
    setValue("Nombre", data?.Nombre);
    setValue("NumCas", data?.NumCas);
    setValue("RFC", data?.RFC);
    setValue("Telefono", data?.Telefono);
    setValue("CvProveedor", data?.CvProveedor);
    setValue("CvDireccion", data?.CvDireccion);
  };

  return (
    <>
      <NavBar />
      {loading && <Loading />}
      <div className="flex justify-center py-10 px-2">
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-autotable items-start">
          <form
            className="gap-y-5 flex flex-col p-3 max-w-[350px] border"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* nombre */}
            <div>
              <div className="flex gap-2">
                <label className="text-right">Nombre:</label>
                <input
                  placeholder={"Nombre"}
                  {...register("Nombre", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              {errors.Nombre && (
                <p className="text-red-600">Nombre es requerido</p>
              )}
            </div>
            {/* apellidos */}
            <div className="flex gap-2">
              <label className="w-[80px] text-right">Encargado:</label>
              <input
                placeholder={"Encargado"}
                {...register("Encargado", { required: true })}
                type="text"
                className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
              />
              {errors.Encargado && (
                <p className="text-red-600">Apellido requerido</p>
              )}
            </div>
            {/* corero */}
            <div>
              <div className="flex gap-2">
                <label className="text-right">Correo:</label>
                <input
                  placeholder={"Correo"}
                  {...register("Correo", {
                    required: true,
                    pattern: /^[\w.-]+@\w+\.\w+$/,
                  })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              {errors.Correo && <p className="text-red-600">Correo o valido</p>}
            </div>
            {/* RFC */}
            <div>
              <div className="flex gap-2">
                <label className="text-right">RFC:</label>
                <input
                  placeholder={"RFC"}
                  {...register("RFC", {
                    required: true,
                    pattern:
                      /^([A-Z&Ñ]{3,4})\d{2}((0[1-9]|1[0-2])(0[1-9]|1\d|2[0-9]|3[01]))[A-Z\d]{2}[A\d]$/,
                    maxLength: 13,
                    minLength: 13,
                  })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              {errors.RFC && <p className="text-red-600">RFC no valido</p>}
            </div>
            {/* direcccion */}
            <Direccion
              register={register}
              errors={errors}
              defaultValues={defaultValues}
            />
            {/* Telefono */}
            <div className="">
              <div className="flex gap-3">
                <label className="">Telefono:</label>
                <input
                  placeholder={"Telefono"}
                  {...register("Telefono", {
                    required: true,
                    pattern: /^\d+$/,
                    maxLength: 10,
                    minLength: 10,
                  })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              {errors.Telefono && (
                <p className="text-red-600">Telefono no valido</p>
              )}
            </div>

            <div className=" flex justify-center gap-3 ">
              <button
                type="submit"
                className="cursor-pointer flex justify-center items-center bg-[#FF81D4] px-6 py-2 rounded-2xl text-white font-bold tracking-wider"
              >
                {updateActive ? "Actualizar" : "Registrar"}
              </button>
              {updateActive && (
                <input
                  onClick={() => {
                    handleupdateActive(false);
                    reset();
                  }}
                  type="button"
                  value="Cancelar"
                  className="cursor-pointer flex justify-center items-center bg-red-400 px-6 py-2 rounded-2xl text-white font-bold tracking-wider"
                />
              )}
            </div>
          </form>
          <div className="overflow-auto xl:overflow-visible">
            <table className="">
              <thead className="border">
                <tr className="">
                  <th className="px-3 border text-blue-400">ID</th>
                  <th className="px-3 border text-blue-400">Empresa</th>
                  <th className="px-3 border text-blue-400">Encargado</th>
                  {/* <th className="px-3 border text-blue-400">Apellido materno</th> */}
                  <th className="px-3 border text-blue-400">Correo</th>
                  <th className="px-3 border text-blue-400">Telefono</th>
                  <th className="px-3 border text-blue-400">RFC</th>
                  <th className="px-3 border text-blue-400">Calle</th>
                  <th className="px-3 border text-blue-400">No.Casa</th>
                  <th className="px-3 border text-blue-400">Estado</th>
                  <th className="px-3 border text-blue-400">Ciudad</th>
                  <th className="px-3 border text-blue-400">Pais</th>
                  <th className="px-3 border text-blue-400">Acciones</th>
                </tr>
              </thead>
              <tbody className="border">
                {providers?.length > 0
                  ? providers?.map((provider, index) => (
                      <Provider
                        key={`${provider?.CvProveedor}${index}`}
                        dataProvider={provider}
                        activeUpdateProvider={activeUpdateProvider}
                        updateProviders={updateProviders}
                      />
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
