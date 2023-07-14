import { useForm } from "react-hook-form";
import { NavBar } from "./components/NavBar";
import { useRegisterProduct } from "./hooks/useRegisterProduct";
import { Loading } from "./components/Loading";
import { toast } from "react-hot-toast";

export const RegisterProduct = () => {
  const {
    colors,
    types,
    uploadImage,
    imageSelected,
    handleImageSelected,
    loading,
  } = useRegisterProduct();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: {
      Nombre: "",
      CvColor: "SELECCIONA UN COLOR",
      CvTipo: "SELECCIONA UN TIPO",
      Caracteristicas: "",
      imageURL: "",
    },
  });

  const onSubmit = (data) => {
    if (
      data?.CvColor === defaultValues?.CvColor ||
      data?.CvTipo === defaultValues?.CvTipo
    ) {
      return toast.error("Selecciona un color y un tipo");
    }
    uploadImage(data);
  };

  return (
    <>
      <NavBar />
      {loading && <Loading />}
      <div className="flex justify-center py-10 px-2">
        <div className="flex gap-2 items-start">
          <form
            className="flex-1 gap-y-5 flex flex-col p-3 w-[350px] border"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* nombre */}
            <div>
              <div className="flex gap-2">
                <label className="text-right">Nombre:</label>
                <input
                  placeholder={"Nombre"}
                  {...register("Nombre", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
            </div>
            {/* color o tipo */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 ">
                <p className="text-base">Color:</p>
                <select
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-1"
                  {...register("CvColor", { required: true, min: 1 })}
                >
                  <option disabled value={"SELECCIONA UN COLOR"}>
                    SELECCIONA UN COLOR
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
              <div className="flex flex-col gap-1 ">
                <p className="text-base">Tipo</p>
                <select
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-1"
                  {...register("CvTipo", { required: true })}
                >
                  <option disabled value={"SELECCIONA UN TIPO"}>
                    SELECCIONA UN TIPO
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
            {/* Caracteristicas */}
            <div>
              <div className="flex gap-2">
                <label className="text-right">Caracteristicas:</label>
                <input
                  {...register("Caracteristicas", { required: true })}
                  type="text"
                  className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
                />
              </div>
            </div>
            <div className=" flex flex-col items-center gap-y-2">
              <div className="flex items-center">
                <img
                  className="w-[40px] h-[40px]"
                  src="https://firebasestorage.googleapis.com/v0/b/floreria-amapola.appspot.com/o/image%2011.png?alt=media&token=eff4208e-bd6d-40ca-b488-86a6808a0c11"
                  alt="logo de agregar imagen"
                />
                <input
                  className="flex-1"
                  {...register("imageURL", { required: true })}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageSelected(e?.target?.files[0])}
                />
              </div>
              {imageSelected && (
                <img
                  src={imageSelected}
                  className="w-max h-max  object-contain"
                  alt="Imagen seleccionada"
                />
              )}
            </div>

            <div className=" flex justify-center">
              <button
                type="submit"
                className="cursor-pointer flex justify-center items-center bg-[#FF81D4] px-6 py-2 rounded-2xl text-white font-bold tracking-wider"
              >
                Registrar
              </button>
            </div>
          </form>
          {/* table */}
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
              </tr>
            </thead>
            <tbody className="border"></tbody>
          </table>
        </div>
      </div>
    </>
  );
};
