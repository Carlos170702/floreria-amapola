import { useForm } from "react-hook-form";
import logo_floreria from "../../assets/logo_floreria.png";
import { Direccion } from "../components/Direccion";
import { useRegister } from "./hooks/useRegister";
import { Loading } from "../components/Loading";

export const Register = () => {
  const { handleRegister, isLoading } = useRegister();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      CvCiudad: "SELECCIONA UNA CIUDAD",
      CvEstado: "SELECCIONA UN ESTADO",
      CvPais: "SELECCIONA UN PAIS",
    },
  });

  // funcion que ejecuta la funcion de registrar que biene del hookUseRegister
  const onSubmit = (data) => {
    // valida si las contraseñas escrias son iguales
    if (data.Contraseña !== data.Confirmar) {
      return setError("Confirmar");
    }
    handleRegister(data);
  };

  return (
    <div className="relative bg-[#D8F0FA] w-full flex justify-center items-center min-h-screen p-14">
      {isLoading && <Loading />}
      <div className="w-[500px] bg-white rounded-md">
        <div className="w-full flex items-center flex-col">
          <img
            src={logo_floreria}
            alt="logo de floreria"
            className="w-[120px] h-[120px] object-cover mt-[-50px]"
          />

          <form
            className="flex-1 gap-y-5 flex flex-col mt-1 w-full px-10 py-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="flex gap-2">
                <label className="text-right">Nombre:</label>
                <input
                  {...register("Nombre", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              {errors.Nombre && (
                <p className="text-red-600">Nombre requerido</p>
              )}
            </div>
            {/* apellidos */}
            <div className="grid grid-cols-2 gap-x-2">
              <div className="">
                <label className="w-[80px] text-right">Apellido Paterno:</label>
                <input
                  {...register("ApePaterno", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
                {errors.ApePaterno && <p className="text-red-600">requerido</p>}
              </div>
              <div className="">
                <label className="w-[80px] text-right">Apellido materno:</label>
                <input
                  {...register("ApeMaterno", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
                {errors.ApeMaterno && <p className="text-red-600">requerido</p>}
              </div>
            </div>
            {/* correo */}
            <div>
              <div className="flex gap-2">
                <label className="text-right">Correo:</label>
                <input
                  {...register("Correo", {
                    required: true,
                    pattern: /^[\w.-]+@\w+\.\w+$/,
                  })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              {errors.Correo && (
                <p className="text-red-600">Correo no valido</p>
              )}
            </div>
            {/* direccion */}
            <Direccion errors={errors} register={register} />
            {/* Telefono y usuario */}
            <div className="grid grid-cols-2 gap-x-2">
              <div className="">
                <label className="text-right">Teléfono:</label>
                <input
                  {...register("Telefono", {
                    required: true,
                    pattern: /^\d+$/,
                    maxLength: 10,
                    minLength: 10,
                  })}
                  type="tel"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
                {errors.Telefono && (
                  <p className="text-red-600">Numero no valido</p>
                )}
              </div>
              <div className="">
                <label className=" text-right">Usuario</label>
                <input
                  {...register("Usuario", {
                    required: true,
                    minLength: 3,
                  })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
                {errors.Usuario && (
                  <p className="text-red-600">Usuario no valido</p>
                )}
              </div>
            </div>
            {/* contrasena */}
            <div>
              <div className="flex gap-2">
                <label className="text-right">Contraseña:</label>
                <input
                  {...register("Contraseña", {
                    required: true,
                    minLength: 6,
                  })}
                  type="password"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              {errors.Contraseña && (
                <p className="text-red-600">
                  Contraseña debe ser mayor a 6 caracteres
                </p>
              )}
            </div>
            <div>
              <div className="flex gap-2">
                <label className="text-right">Confirmar contraseña:</label>
                <input
                  {...register("Confirmar")}
                  type="password"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              {errors.Confirmar && (
                <p className="text-red-600">Contraseña debe ser igual</p>
              )}
            </div>

            {/* btn submit */}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="cursor-pointer flex justify-center items-center bg-[#72C9DC] px-3 py-1 rounded-2xl text-white "
              >
                <p className="font-sans font-bold tracking-widest">
                  Registrarse
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
