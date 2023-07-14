import { useEffect, useState } from "react";
import { apiQueries } from "../../api/ApiQueries";

export const Direccion = ({
  register,
  errors,
  dataUser = null,
  updateUser = null,
}) => {
  const [ciudades, setCiudades] = useState(null);
  const [estados, setEstados] = useState(null);
  const [paises, setPaises] = useState(null);

  const getCiudades = async () => {
    try {
      const { data } = await apiQueries("/getCiudades");
      if (data?.error) return;
      setCiudades(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getEstados = async () => {
    try {
      const { data } = await apiQueries("/getEstados");
      if (data?.error) return;
      setEstados(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getPaises = async () => {
    try {
      const { data } = await apiQueries("/getPaises");
      if (data?.error) return;
      setPaises(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCiudades();
    getEstados();
    getPaises();
  }, []);

  return (
    <div className="col-start-1 col-end-4">
      <div className="flex gap-x-3">
        {/* calle */}
        <div>
          <label>Calle:</label>
          <input
            placeholder={dataUser?.Calle || "Calle"}
            {...register("Calle", { required: true })}
            type="text"
            className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-2"
          />
          {errors.Calle && <p className="text-red-600">requerido</p>}
        </div>
        {/* numero de casa */}
        <div>
          <label>Num. casa</label>
          <input
            placeholder={dataUser?.NumCas || "NumCas"}
            {...register("NumCas", { required: true })}
            type="text"
            className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-2"
          />
          {errors.NumCas && <p className="text-red-600">requerido</p>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-5">
        {/* ciudad */}
        <div className="flex flex-col gap-1 ">
          <p className="text-base">Ciudad:</p>
          <select
            onChange={(e) =>
              updateUser &&
              updateUser({ ...dataUser, CvCiudad: e?.target?.value })
            }
            className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-1"
            {...register("CvCiudad", { required: true })}
          >
            <option disabled value={"SELECCIONA UNA CIUDAD"}>
              SELECCIONA UNA CIUDAD
            </option>
            {!!ciudades &&
              ciudades?.map((ciudad) => (
                <option key={ciudad?.CvCiudad} value={ciudad?.CvCiudad}>
                  {ciudad?.DsCiudad}
                </option>
              ))}
          </select>
        </div>
        {/* estado */}
        <div className="flex flex-col gap-1 ">
          <p className="text-base">Estado:</p>
          <select
            onChange={(e) => {
              console.log("hola");
              // updateUser &&
              //   updateUser({ ...dataUser, CvEstado: e?.target?.value });
            }}
            className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-1"
            {...register("CvEstado", { required: true })}
          >
            <option disabled value={"SELECCIONA UN ESTADO"}>
              SELECCIONA UN ESTADO
            </option>
            {!!estados &&
              estados?.map((estado) => (
                <option key={estado?.CvEstado} value={estado?.CvEstado}>
                  {estado?.DsEstado}
                </option>
              ))}
          </select>
        </div>
        {/* pais */}
        <div className="flex flex-col gap-1 ">
          <p className="text-base">Pais:</p>
          <select
            onChange={(e) =>
              updateUser &&
              updateUser({ ...dataUser, CvPais: e?.target?.value })
            }
            className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-blue-300 pl-1"
            {...register("CvPais", { required: true })}
          >
            <option disabled value={"SELECCIONA UN PAIS"}>
              SELECCIONA UN PAIS
            </option>
            {!!paises &&
              paises?.map((pais) => (
                <option key={pais?.CvPais} value={pais?.CvPais}>
                  {pais?.DsPais}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};
