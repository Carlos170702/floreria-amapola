import { NavBar } from "./components/NavBar";
import { Carrucel_header } from "./components/Carrucel_header";
import { CardProduct } from "./components/CardProduct";
import icon_whatsapp from ".././assets/icon_whatsapp.png";
import { useNavigate } from "react-router-dom";
import { useMenuProductos } from "./hooks/useMenuProductos";
import { Loading } from "./components/Loading";

export const MenuProductos = () => {
  const { allFlowers, loading } = useMenuProductos();
  const navigate = useNavigate();

  return (
    <div className="relative">
      {loading && <Loading />}
      <NavBar />
      <Carrucel_header />

      <div className="w-width_contenedor ml-auto mr-auto mb-5 mt-10 grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-col-5 gap-5 justify-items-center relative">
        {!!allFlowers ? (
          allFlowers?.map((flower, index) => (
            <CardProduct
              key={`${index}${flower?.CvProducto}`}
              flower={flower}
            />
          ))
        ) : (
          <h2 className="w-full text-red-400">No hay productos</h2>
        )}
      </div>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          onClick={() => navigate("/listProducts")}
          className="cursor-pointer flex justify-center items-center bg-[#72C9DC] px-3 py-1 rounded-2xl text-white"
        >
          <p className="font-mono">Ver más</p>
        </button>
      </div>

      <button className="bottom-12 right-10 fixed w-[60px] ">
        <img src={icon_whatsapp} alt="icono de whatsapp" />
      </button>
    </div>
  );
};
