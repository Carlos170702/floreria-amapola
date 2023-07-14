import dark from "../../assets/dark.png";
import light from "../../assets/light.png";
import carrito from "../../assets/carrito.png";

export const CardProduct = ({ flower }) => {

  const { PreVenta, Existencia, imageURL, Nombre, Color, Tipo } = flower;
  return (
    <div className="w-[170px] bg-blue-300 card_product p-1 flex flex-col gap-1 border-gray-100 border-[.2px] border-solid">
      <div className="flex justify-between items-center">
        <p>{Nombre}</p>
        <img src={Tipo === "sombra" ? dark : light} alt="dark" />
      </div>
      <div className=" w-full h-[110px] object-cover">
        <img
          className="h-full w-full object-cover"
          src={imageURL}
          alt={Nombre}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-1">
          <h4>Precio:</h4>
          <h3>
            <span>$</span>
            {PreVenta} MXN
          </h3>
        </div>
        <div className="flex gap-1">
          <h4>Disponibles:</h4>
          <h3>{Existencia} Pzas</h3>
        </div>
        <div className="flex gap-1">
          <h4>Color:</h4>
          <h3>{Color}</h3>
        </div>
      </div>
      <button className="flex m-2 pt-1 pb-1 pl-2 pr-2 self-center bg-green-400 rounded-md cursor-pointer">
        <img src={carrito} className="w-[25px]" alt="carrito de compras" />
        <h3 className="text-white">Agregar</h3>
      </button>
    </div>
  );
};
