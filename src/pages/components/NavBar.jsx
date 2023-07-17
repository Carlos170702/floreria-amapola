import logo from "../../assets/logo_floreria.png";
import Icono_usuario from "../../assets/Icono_usuario.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiMenu } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UseContex } from "../../context/UseContex";

export const NavBar = () => {
  const { reset, dataUser } = useContext(UseContex);
  const [activeNav, setActiveNav] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#D8F0FA]">
      <div className="w-nav_auto justify-between flex items-center ml-auto mr-auto pt-3 pb-3">
        <button onClick={() => navigate("/")}>
          <img
            src={logo}
            alt="logo de floreria amapola"
            className="h-[60px] w-[60px]"
          />
        </button>

        <button onClick={() => setActiveNav(!activeNav)}>
          <BiMenu size={30} />
        </button>

        <div
          className={`flex absolute flex-col gap-4 bg-white border border-[#cdcdcd50] z-[2] top-[100px] right-0 shadow-lg rounded-l-md p-5 ${
            !activeNav && "hidden"
          }`}
        >
          <div className="w-full flex  justify-center items-center">
            <img
              className="w-[100px]"
              src={Icono_usuario}
              alt="icono de usuario"
            />
          </div>
          <div className="flex-1 gap-2 rounded p-2 flex flex-col">
            <Link
              to={"/perfil"}
              className="hover:underline tracking-wider font-mono"
            >
              Mi Cuenta
            </Link>
            {dataUser?.DsRol === "ADMINISTRADOR" && (
              <>
                <Link
                  to={"/registerProvider"}
                  className=" hover:underline tracking-wider font-mono"
                >
                  Registrar proveedor
                </Link>
                <Link
                  to={"/registerProduct"}
                  className=" hover:underline tracking-wider font-mono"
                >
                  Registrar Producto
                </Link>
              </>
            )}
            <Link
              to={"/login"}
              onClick={reset}
              className=" hover:underline tracking-wider font-mono text-red-500"
            >
              Cerrar Sección
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
