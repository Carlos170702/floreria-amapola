import { useForm } from "react-hook-form";
import { NavBar } from "./components/NavBar";
import { useRegisterProduct } from "./hooks/useRegisterProduct";
import { Loading } from "./components/Loading";
import { toast } from "react-hot-toast";

export const RegisterProduct = () => {
  const {
    colors, // Lista de colores
    types, // Lista de tipos
    addProduct, // Función para agregar un producto
    loading, // Estado de carga
    products, // Lista de productos
    deleteProduct, // Función para eliminar un producto
    activeUpdate, // Estado para indicar si hay una actualización en curso
    setValuesUpdate, // Función para establecer los valores de actualización
    resetAll, // Función para reiniciar todos los campos
    updateProduct, // Función para actualizar un producto
  } = useRegisterProduct();
  // Desestructurar los valores y funciones proporcionados por el hook personalizado 'useForm'
  const {
    setValue, // Función para establecer el valor de los campos del formulario
    register, // Función para registrar campos del formulario
    handleSubmit, // Función para manejar la presentación del formulario
    reset, // Función para reiniciar el formulario
    formState: { defaultValues }, // Estado del formulario y valores predeterminados
  } = useForm({
    defaultValues: {
      // Valores predeterminados para el formulario
      Nombre: "",
      CvColor: "SELECCIONA UN COLOR",
      CvTipo: "SELECCIONA UN TIPO",
      Caracteristicas: "",
      imageURL: "",
      Existencia: "",
      Stock: "",
      PreVenta: "",
      PrecCompra: "",
    },
  });

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    // Verificar si no se ha seleccionado un color o un tipo
    if (
      data?.CvColor === defaultValues?.CvColor ||
      data?.CvTipo === defaultValues?.CvTipo
    )
      return toast.error("Selecciona un color y un tipo");

    // if (data?.PrecCompra > data?.PreVenta)
    //   return toast.error("Precios no validos");

    // Verificar si no se ha seleccionado una imagen
    if (data?.imageURL.length <= 0) return toast.error("Selecciona una imagen");

    // Si hay una actualización en curso ('activeUpdate' es true), llamar a la función 'updateProduct' del hook 'useRegisterProduct'
    // Pasar los datos del formulario y la función para reiniciar el formulario ('reset')
    // Si no hay una actualización en curso, llamar a la función 'addProduct' del hook 'useRegisterProduct'
    // Pasar los datos del formulario y la función para reiniciar el formulario ('reset')
    activeUpdate ? updateProduct(data, reset) : addProduct(data, reset);
  };

  return (
    <>
      <NavBar />
      {loading && <Loading />}
      <div className="flex justify-center py-10 px-2">
        <div className="grid grid-cols-1 gap-2 items-start xl:grid-cols-autotable">
          <form
            className="flex-1 gap-y-5 flex flex-col p-3 max-w-[400px] border"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-center font-bold tracking-widest text-xl">
              Productos
            </h2>
            {/* nombre */}
            <div>
              <div className="flex gap-2">
                <label className="text-right">Nombre:</label>
                <input
                  {...register("Nombre", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
            </div>
            {/* cantidad y stock */}
            <div className="flex gap-2">
              <div className="flex gap-1 items-center">
                <p className="">Cantidad:</p>
                <input
                  {...register("Existencia", { required: true, min: 1 })}
                  type="number"
                  min={1}
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px] font-bold"
                />
              </div>
              <div className="flex gap-1 items-center ">
                <p className="">Stock:</p>
                <input
                  {...register("Stock", { required: true, min: 1 })}
                  type="number"
                  min={1}
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px] font-bold"
                />
              </div>
            </div>
            {/* color o tipo */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-base">Color:</p>
                <select
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-1"
                  {...register("CvColor", { required: true, min: 1 })}
                >
                  <option disabled value={"SELECCIONA UN COLOR"}>
                    COLOR
                  </option>
                  {colors.length > 0 &&
                    colors.map((color, index) => (
                      <option
                        key={`${color?.DsColor} ${index}`}
                        value={color?.CvColor}
                      >
                        {color?.DsColor}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-base">Tipo</p>
                <select
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-1"
                  {...register("CvTipo", { required: true })}
                >
                  <option disabled value={"SELECCIONA UN TIPO"}>
                    TIPO
                  </option>
                  {types.length > 0 &&
                    types?.map((tipo, index) => (
                      <option
                        key={`${tipo?.DsTipo}${index}`}
                        value={tipo?.CvTipo}
                      >
                        {tipo?.DsTipo}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* precio compra y precio venta */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 relative">
                <p className="">Precio venta:</p>
                <p className="absolute bottom-1 left-2 text-lg text-[#cdcdcd]">
                  $
                </p>
                <input
                  {...register("PreVenta", { required: true, min: 1 })}
                  type="number"
                  step={0.1}
                  min={1}
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-5 text-[15px]"
                />
              </div>
              <div className="flex gap-1 flex-col relative">
                <p className="">Precio compra:</p>
                <p className="absolute bottom-1 left-2 text-lg text-[#cdcdcd]">
                  $
                </p>
                <input
                  {...register("PrecCompra", { required: true, min: 1 })}
                  type="number"
                  step={0.1}
                  min={1}
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-5 text-[15px]"
                />
              </div>
            </div>
            {/* Caracteristicas */}
            <div>
              <div className="flex gap-2 flex-col">
                <label className="text-left">Caracteristicas:</label>
                <textarea
                  rows={5}
                  {...register("Caracteristicas", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 p-3 text-[10px]"
                />
              </div>
            </div>
            {/* seleccionar una imagen */}
            <div className=" flex flex-col items-center gap-y-2">
              <div className="flex items-center">
                <img
                  className="w-[40px] h-[40px]"
                  src="https://firebasestorage.googleapis.com/v0/b/floreria-amapola.appspot.com/o/image%2011.png?alt=media&token=eff4208e-bd6d-40ca-b488-86a6808a0c11"
                  alt="logo de agregar imagen"
                />
                <input
                  className="flex-1"
                  {...register("imageURL")}
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>

            <div className=" flex justify-around">
              <button
                type="submit"
                className="cursor-pointer flex justify-center items-center bg-[#FF81D4] px-6 py-2 rounded-2xl text-white font-bold tracking-widest"
              >
                {activeUpdate ? "Actualizar" : "Registrar"}
              </button>

              <button
                type="submit"
                className="cursor-pointer flex justify-center items-center bg-red-500 px-6 py-2 rounded-2xl text-white font-bold tracking-widest"
                disabled={!activeUpdate}
                onClick={() => resetAll(reset)}
              >
                Cancelar
              </button>
            </div>
          </form>
          {/* table */}
          <div className="overflow-auto xl:overflow-visible">
            <table>
              <thead className="border">
                <tr className="">
                  <th className="px-3 border">ID</th>
                  <th className="px-3 border">Nombre</th>
                  <th className="px-3 border">Cantidad</th>
                  <th className="px-3 border">Color</th>
                  <th className="px-3 border">Tipo</th>
                  <th className="px-3 border">Caracteristicas</th>
                  <th className="px-3 border">Precio Compra</th>
                  <th className="px-3 border">Precio venta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="border">
                {products.length > 0 &&
                  products?.map((product, index) => (
                    <tr className="" key={product?.CvInventario}>
                      <td className=" border px-2 text-center">{index + 1}</td>
                      <td className=" border px-2 ">{product?.Nombre}</td>
                      <td className=" border px-2 text-center">
                        {product?.Existencia}
                      </td>
                      <td className=" border px-2 ">{product?.Color}</td>
                      <td className=" border px-2 ">{product?.Tipo}</td>
                      <td className=" border px-2 ">
                        {product?.Caracteristicas}
                      </td>
                      <td className=" border px-2 text-center">
                        {product?.PrecCompra}
                      </td>
                      <td className=" border px-2 text-center">
                        {product?.PreVenta}
                      </td>
                      <td className="text-xs flex gap-1 mx-2 my-1 ">
                        <button
                          className=" p-2 px-3 bg-red-400 text-white rounded uppercase cursor-pointer"
                          onClick={() => deleteProduct(product?.CvInventario)}
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => setValuesUpdate(product, setValue)}
                          className=" p-2 px-3 bg-indigo-500 text-white rounded uppercase cursor-pointer"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
