import { useContext } from "react";
import { UseContex } from "../../context/UseContex";
import { HiXMark } from "react-icons/hi2";

export const ModalProduct = ({ flowerSelected }) => {
  const { handleSelectFlower } = useContext(UseContex);

  return (
    <div className="fixed w-full h-screen bg-[#cdcdcd80] z-50 flex justify-center, items-center ">
      <div className="relative m-auto  bg-white max-w-min p-10 flex justify-center, items-center rounded-lg flex-col">
        <HiXMark
          color="red"
          size={25}
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => handleSelectFlower(null)}
        />
        <h2 className="text-xl font-bold -tracking-tighter font-mono">
          {flowerSelected?.Nombre}
        </h2>
        <div className="border-solid border-[1px] border-[#cdcdcd] w-full mb-1" />
        <div className="w-[300px]">
          <img src={flowerSelected?.imageURL} alt="flor de amapola" />
        </div>

        <div className="grid grid-cols-2 w-full gap-x-2 mt-1">
          <div className="flex gap-2 flex-col">
            <label className="text-left">Color:</label>
            <input
              defaultValue={flowerSelected?.Color}
              type="text"
              className="w-full border border-[#cdcdcd] rounded-2xl outline-none shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
              readOnly
            />
          </div>
          <div className="flex gap-2 flex-col">
            <label className="text-left">Tipo:</label>
            <input
              defaultValue={flowerSelected?.Tipo}
              type="text"
              className="w-full border border-[#cdcdcd] rounded-2xl outline-none shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
              readOnly
            />
          </div>
          <div className="flex gap-2 flex-col col-start-1 col-end-4">
            <label className="text-left">Caracteristicas:</label>
            <textarea
              defaultValue={flowerSelected?.Caracteristicas}
              readOnly
              rows="5"
              className="w-full border border-[#cdcdcd] rounded-2xl outline-none shadow-md shadow-[#cdcdcd50] flex-1 py-2 px-2 text-[10px]"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
