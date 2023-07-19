import { useForm } from "react-hook-form";
import { Direccion } from "./components/Direccion";
import { NavBar } from "./components/NavBar";
import { useRegistrProvider } from "./hooks/useRegistrProvider";
import { Provider } from "./components/Provider";
import { Loading } from "./components/Loading";

export const RegistrProvider = () => {
  const {
    providers,
    loading,
    addDIrection,
    updateProviders,
    updateActive,
    handleupdateActive,
    updateDirection,
  } = useRegistrProvider();
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
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

  const onSubmit = (data) => {
    updateActive
      ? updateDirection(data, handleupdateActive, reset)
      : addDIrection(data, reset);
  };

  const activeUpdateProvider = (data) => {
    handleupdateActive(true);
    setValue("ApeMaterno", data?.ApeMaterno);
    setValue("ApePaterno", data?.ApePaterno);
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
        <div className="flex gap-2 items-start">
          <form
            className="flex-1 gap-y-5 flex flex-col p-3 w-[350px] border"
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
          <table>
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
    </>
  );
};
