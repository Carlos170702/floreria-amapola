import ProfileFhoto from ".././assets/perfil.png";
import { usePerfil } from "./hooks/usePerfil";
import { Direccion } from "./components/Direccion";
import { Loading } from "./components/Loading";
import { NavBar } from "./components/NavBar";
import { useForm } from "react-hook-form";

export const Perfil = () => {
  const { loading, dataUser, updateUser, actualizarData } = usePerfil();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    values: {
      Nombre: "",
      ApePaterno: "",
      ApeMaterno: "",
      Telefono: "",
      Usuario: "",
      Correo: "",
      Calle: "",
      NumCas: "",
      CvCiudad: dataUser?.CvCiudad,
      CvEstado: dataUser?.CvEstado,
      CvPais: dataUser?.CvPais,
    },
  });

  const onSubmit = (data) => {
    actualizarData(data)
  };

  return (
    <>
      <NavBar />
      {loading && <Loading />}
      <div className="flex justify-center items-center h-[84vh]">
        <div className="w-width_Perfil bg-[#FFFAFA] flex items-center flex-col p-5">
          <img
            src={ProfileFhoto}
            alt="Foto de perfil"
            className="w-[100px] h-[100px]"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full grid grid-cols-2 gap-x-3 gap-y-5 mt-4 border border-gray-200 p-5 rounded-md"
          >
            {/* nombre */}
            <div className="col-start-1 col-end-4">
              <div className="flex gap-2 items-center">
                <label>Nombre:</label>
                <input
                  placeholder={dataUser?.Nombre}
                  {...register("Nombre", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-2"
                />
              </div>
              {errors.Nombre && <p className="text-red-600">Campo requerido</p>}
            </div>
            {/* apellido */}
            <div className="flex col-start-1 col-end-4 gap-4">
              <div className="flex flex-col gap-1">
                <label>Apellido paterno:</label>
                <input
                  placeholder={dataUser?.ApePaterno}
                  {...register("ApePaterno", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-2"
                />
                {errors.ApePaterno && (
                  <p className="text-red-600">Campo requerido</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label>Apellido materno:</label>
                <input
                  placeholder={dataUser?.ApeMaterno}
                  {...register("ApeMaterno", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-2"
                />
                {errors.ApeMaterno && (
                  <p className="text-red-600">Campo requerido</p>
                )}
              </div>
            </div>
            {/* telefono */}
            <div>
              <div className="flex gap-2 items-center">
                <label>Telefono:</label>
                <input
                  placeholder={dataUser?.Telefono}
                  {...register("Telefono", {
                    required: true,
                    pattern: /^\d+$/,
                    maxLength: 10,
                    minLength: 10,
                  })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-2"
                />
              </div>
              {errors.Telefono && (
                <p className="text-red-600">Telefono no valido</p>
              )}
            </div>
            {/* usuario */}
            <div>
              <div className="flex gap-2 items-center">
                <label>Usuario:</label>
                <input
                  placeholder={dataUser?.Usuario}
                  {...register("Usuario", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-2"
                />
              </div>
              {errors.Usuario && (
                <p className="text-red-600">Campo requerido</p>
              )}
            </div>
            {/* correo */}
            <div className="col-start-1 col-end-4">
              <div className="flex gap-2 items-center">
                <label>Correo:</label>
                <input
                  placeholder={dataUser?.Correo}
                  {...register("Correo", {
                    required: true,
                    pattern: /^[\w.-]+@\w+\.\w+$/,
                  })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-2"
                />
              </div>
              {errors.Correo && (
                <p className="text-red-600">Correo no valido</p>
              )}
            </div>

            {/* direccion */}
            <Direccion
              register={register}
              errors={errors}
              dataUser={dataUser}
              updateUser={updateUser}
            />

            <div className="col-start-1 col-end-4 flex justify-center ">
              <button className="cursor-pointer bg-[#FF81D4] px-5 py-2 rounded-2xl text-white font-bold tracking-wider">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full bg-[#D8F8FF] h-[135px]" />
    </>
  );
};
