import logo_floreria from "../../assets/logo_floreria.png";
import { UseContex } from "../../context/UseContex";
import { useContext } from "react";
import { useForm } from "../../hooks/useForm";
import { Loading } from "../components/Loading";
import { Link } from "react-router-dom";

export const Login = () => {
  const { formState, onInputChange } = useForm({
    user: "",
    password: "",
  });

  const { login, loading } = useContext(UseContex);

  return (
    <div className="relative bg-[#D8F0FA] w-full h-screen flex justify-center items-center">
      {loading && <Loading />}
      <div className=" w-[400px] bg-white rounded-md">
        <div className="w-full flex items-center flex-col">
          <img
            src={logo_floreria}
            alt="logo de floreria"
            className="w-[120px] h-[120px] object-cover mt-[-50px]"
          />

          <form className="flex-1 gap-y-5 flex flex-col mt-5 w-full px-10 py-5">
            <div className="flex gap-2">
              <label className="w-[80px] text-right">Usuario:</label>
              <input
                onChange={onInputChange}
                name="user"
                type="text"
                className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
              />
            </div>
            <div className="flex gap-2">
              <label className="w-[80px] text-right">Contraseña:</label>
              <input
                onChange={onInputChange}
                name="password"
                type="password"
                className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
              />
            </div>

            {/* restablecer contraseña */}
            <div>
              {/* registrarse */}
              <div className="text-right">
                <Link className="underline text-blue-600" to={"/register"}>
                  Registrarse
                </Link>
              </div>
              {/* restablecer contraseña */}
              <div className="text-right">
                <Link
                  className="underline text-blue-600"
                  to={"/forgetPassword"}
                >
                  Restablecer contraseña
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  login({ ...formState });
                }}
                className="cursor-pointer flex justify-center items-center bg-[#72C9DC] px-3 py-1 rounded-2xl text-white "
              >
                <p className="font-mono">Iniciar sección</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
