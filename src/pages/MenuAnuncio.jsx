import { NavBar } from "./components/NavBar";
import { Carrucel_header } from "./components/Carrucel_header";
import { CardProduct } from "./components/CardProduct";
import icon_whatsapp from ".././assets/icon_whatsapp.png";
import { useNavigate } from "react-router-dom";
import { useMenuProductos } from "./hooks/useMenuProductos";
import { Loading } from "./components/Loading";
import { ModalProduct } from "./components/ModalProduct";
import { Anuncio } from "./components/Anuncio";

export const MenuAnuncio = () => {
  const { allFlowers, loading, flowerSelected } = useMenuProductos();
  const navigate = useNavigate();

  return (
    <div>
      {flowerSelected && <ModalProduct flowerSelected={flowerSelected} />}
      {loading && <Loading />}
      <NavBar />
      <Carrucel_header />
      <div className="grid w-width_contenedor ml-auto mr-auto mb-5 mt-10 grid-cols-1 Movil:grid-cols-2 items-center sm:grid-col-3 md:grid-cols-4 lg:grid-col-5 gap-5 justify-items-center relative">
        {!!allFlowers ? (
          allFlowers?.map((flower, index) =>
            index === 8 ? (
              <Anuncio key={138493} allFlowers={allFlowers} />
            ) : (
              <CardProduct
                key={`${index}${flower?.CvProducto}`}
                flower={flower}
              />
            )
          )
        ) : (
          <h2 className="w-full text-red-400">No hay productos</h2>
        )}
      </div>

      <div className="flex justify-center items-center mb-6 gap-5">
        <button
          type="submit"
          onClick={() => navigate("/listProducts")}
          className="cursor-pointer flex justify-center items-center bg-[#72C9DC] px-3 py-1 rounded-2xl text-white"
        >
          <p className="font-mono">Ver más</p>
        </button>
      </div>

      <button
        className="bottom-12 right-10 fixed w-[60px]"
      >
        <img src={icon_whatsapp} alt="icono de whatsapp" />
      </button>
    </div>
  );
};
