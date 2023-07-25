import { Loading } from "./components/Loading";
import { NavBar } from "./components/NavBar";
import { ProductCart } from "./components/ProductCart";
import { useFlowerCar } from "./hooks/useFlowerCar";

export const FlowerCart = () => {
  const {
    tipoPago,
    car,
    subtotal,
    iva,
    total,
    date,
    handleChangeTipoPago,
    makeSale,
    isLoading,
  } = useFlowerCar();

  return (
    <>
      {isLoading && <Loading />}
      <NavBar />
      <div className="w-full min-h-screen flex justify-center">
        <div
          className=" bg-[#ffecec] w-width_contenedor my-10 p-[20px] rounded-md flex justify-center gap-10
        "
        >
          {/* productos carritos */}
          <div className="flex flex-col gap-y-3">
            <h2 className="text-center text-xl mb-1 font-bold tracking-wider">
              Productos
            </h2>
            {car?.length <= 0 ? (
              <h2 className="text-center text-sm text-red-500 mb-1 font-bold tracking-wider">
                No hay productos en el carrito
              </h2>
            ) : (
              car?.map((flower) => (
                <ProductCart key={flower.CvInventario} flower={flower} />
              ))
            )}
          </div>

          {/* data de dinero */}
          <div className="flex gap-3 flex-col ">
            <p className="text-lg mb-1 text-center">{date}</p>
            <div>
              <div className="bg-gray-300 flex p-3 rounded-lg flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <p className="text-xs">Tipo de pago:</p>
                  <select
                    defaultValue={0}
                    className=" border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-1"
                    onChange={handleChangeTipoPago}
                  >
                    <option disabled value={0}>
                      TIPO DE PAGO
                    </option>
                    {tipoPago.map((tipo) => (
                      <option
                        key={tipo?.CvTipoDePago}
                        value={tipo?.CvTipoDePago}
                      >
                        {tipo?.DsTipoDePago}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 justify-end items-center">
                  <p className="text-xs">Subtotal: </p>
                  <p className="border">
                    <span className="font-bold">$ </span>
                    {subtotal} MXN
                  </p>
                </div>
                <div className="flex gap-2 justify-end items-center">
                  <p className="text-xs">IVA: </p>
                  <p className="border">
                    <span className="font-bold">$ </span>
                    {iva} MXN
                  </p>
                </div>
              </div>
              <hr className="w-full h-[2px] bg-gray-200" />
              <div className="flex gap-2 justify-end items-center mr-3">
                <p className="text-xs">Total: </p>
                <p className="border text-green-500 font-bold">
                  <span className="font-bold">$ </span>
                  {total} MXN
                </p>
              </div>
            </div>

            <div className=" flex justify-center gap-3">
              <button
                type="submit"
                className="cursor-pointer flex justify-center items-center bg-[#FF81D4] px-6 py-2 rounded-2xl text-white font-bold tracking-widest"
                onClick={() => makeSale()}
              >
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
