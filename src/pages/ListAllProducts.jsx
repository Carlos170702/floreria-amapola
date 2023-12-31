import { CardProduct } from "./components/CardProduct";
import { AiOutlineSearch } from "react-icons/ai";
import { NavBar } from "./components/NavBar";
import { useMenuProductos } from "./hooks/useMenuProductos";
import { ModalProduct } from "./components/ModalProduct";

export const ListAllProducts = () => {
  const { colors, formState, onInputChange, flowersFilter, flowerSelected } =
    useMenuProductos();

  return (
    <>
      {flowerSelected && <ModalProduct flowerSelected={flowerSelected} />}
      <NavBar />
      <div className="w-width_contenedor ml-auto mr-auto mt-5 grid grid-col-1 gap-3 Movil:grid-cols-2 md:grid-cols-3">
        <div className="relative  Movil:col-start-1 Movil:col-end-3 md:col-end-2">
          <input
            name="Nombre"
            onChange={(e) => {
              onInputChange(e);
            }}
            type="text"
            className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-2"
          />
          <AiOutlineSearch
            className="absolute top-1 right-2"
            color="#cacaca"
            size={20}
          />
        </div>
        <div className="flex gap-1 items-center">
          <p className="text-base">Color:</p>
          <select
            defaultValue={"SELECCIONA UN COLOR"}
            onChange={(e) => {
              onInputChange(e);
            }}
            className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-1"
            name="Color"
          >
            <option disabled value={"SELECCIONA UN COLOR"}>
              SELECCIONA UN COLOR
            </option>
            {!!colors &&
              colors.map((color) => (
                <option key={color.CvColor} value={color?.DsColor}>
                  {color?.DsColor}
                </option>
              ))}
          </select>
        </div>
        <div className="w-auto flex gap-1 items-center">
          <p className="text-base">Precio:</p>
          <input
            name="Precio"
            onChange={onInputChange}
            type="range"
            min="1  "
            max="3000"
            step="2"
          />
          <p>{`$ ${formState?.Precio} MXN`}</p>
        </div>
      </div>

      <div className="w-width_contenedor ml-auto mr-auto mb-5 mt-10 grid grid-cols-1 Movil:grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-col-5 gap-5 justify-items-center relative">
        {!!flowersFilter ? (
          flowersFilter?.map((flower, index) => (
            <CardProduct
              key={`${index}${flower?.CvProducto}`}
              flower={flower}
            />
          ))
        ) : (
          <h2 className="w-full text-red-400">No hay productos</h2>
        )}
      </div>
      <div className="w-full bg-[#D8F8FF] h-[135px]" />
    </>
  );
};
