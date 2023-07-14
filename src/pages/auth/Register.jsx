import logo_floreria from "../../assets/logo_floreria.png";
import { Direccion } from "../components/Direccion";

export const Register = () => {
  return (
    <div className="relative bg-[#D8F0FA] w-full h-screen flex justify-center items-center">
      {/* {loading && <Loading />} */}
      <div className="w-[400px] bg-white rounded-md">
        <div className="w-full flex items-center flex-col">
          <img
            src={logo_floreria}
            alt="logo de floreria"
            className="w-[120px] h-[120px] object-cover mt-[-50px]"
          />

          <form className="flex-1 gap-y-5 flex flex-col mt-1 w-full px-10 py-5">
            <div className="flex gap-2">
              <label className="text-right">Nombre:</label>
              <input
                name="nombre"
                type="text"
                className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
              />
            </div>
            {/* apellidos */}
            <div className="grid grid-cols-2 gap-x-2">
              <div className="">
                <label className="w-[80px] text-right">Apellido Paterno:</label>
                <input
                  name="apellido_paterno"
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              <div className="">
                <label className="w-[80px] text-right">Apellido materno:</label>
                <input
                  name="apellido_materno"
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
            </div>
            {/* correo */}
            <div className="flex gap-2">
              <label className="text-right">Correo:</label>
              <input
                name="correo"
                type="text"
                className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
              />
            </div>
            {/* direccion */}
            <Direccion />
            {/* Telefono y usuario */}
            <div className="grid grid-cols-2 gap-x-2">
              <div className="">
                <label className="text-right">Teléfono:</label>
                <input
                  name="telefono"
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
              <div className="">
                <label className=" text-right">Usuario</label>
                <input
                  name="usuario"
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
            </div>
            {/* contrasena */}
            <div className="flex gap-2">
              <label className="text-right">Contraseña:</label>
              <input
                name="contrasena"
                type="text"
                className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
