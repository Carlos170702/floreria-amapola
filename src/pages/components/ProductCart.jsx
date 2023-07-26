import { useContext } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { UseContex } from "../../context/UseContex";

export const ProductCart = ({ flower }) => {
  const { addCar, deleteCar } = useContext(UseContex);

  return (
    <>
      <div className="bg-white p-[10px] flex gap-5 rounded-lg justify-between">
        <div className="w-[130px] h-[100px]  rounded-lg hidden sm:block ">
          <img
            className="w-full h-full object-cover"
            src={flower?.imageURL}
            alt="inagen de flor de sempasuchi"
          />
        </div>

        {/* precios */}
        <div>
          <div>
            <p className="text-sm">Precio:</p>
            <p className="text-blue-400 font-bold font-mono">
              <span>$</span> {flower?.PreVenta} MXN
            </p>
          </div>
          <div>
            <p className="text-sm">Total:</p>
            <p className="text-blue-400 font-bold font-mono">
              <span>$</span> {(flower?.PreVenta * flower?.quantity).toFixed(2)}
              MXN
            </p>{" "}
          </div>
        </div>

        <div className="flex  flex-col justify-between items-end">
          <div className="w-[25px] self-end">
            <img
              className="w-full"
              src={
                flower?.Tipo === "luz"
                  ? "https://firebasestorage.googleapis.com/v0/b/neolife-c7fcb.appspot.com/o/light.png?alt=media&token=ee2a8a8e-8da5-47b5-998b-2f37d71dd693"
                  : "https://firebasestorage.googleapis.com/v0/b/neolife-c7fcb.appspot.com/o/dark.png?alt=media&token=c7bcfd14-6f57-4b61-a9c6-f585960f01be"
              }
              alt="imagen de sol"
            />
          </div>
          <div className="flex items-center gap-2 border p-1 rounded-2xl">
            <IoIosAddCircleOutline
              size={20}
              className="cursor-pointer"
              onClick={() => addCar(flower)}
            />
            <p>{flower?.quantity}</p>
            <IoIosRemoveCircleOutline
              size={20}
              className="cursor-pointer"
              onClick={() => deleteCar(flower)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
