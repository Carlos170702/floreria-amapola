import { useForm } from "react-hook-form";
import logo_floreria from "../../assets/logo_floreria.png";
import { apiQueries } from "../../api/ApiQueries";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    resetPassword(data);
  };

  const resetPassword = async ({ correo }) => {
    try {
      const { data } = await apiQueries.post("/recovery-pass", {
        email: correo,
      });

      if (data?.error) {
        setIsLoading(false);
        return toast.error("No se pudo restablecer la contraseña");
      }

      toast.success("Contraseña actualizada");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="relative bg-[#D8F0FA] w-full h-screen flex justify-center items-center">
      <div className=" w-[400px] bg-white rounded-md">
        <div className="w-full flex items-center flex-col">
          <img
            src={logo_floreria}
            alt="logo de floreria"
            className="w-[120px] h-[120px] object-cover mt-[-50px]"
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 gap-y-5 flex flex-col mt-5 w-full px-10 py-5"
          >
            <div className="">
              <label className="w-[80px] text-right">Correo:</label>
              <input
                {...register("correo", { required: true })}
                type="text"
                className="w-full border border-[#cdcdcd] rounded-2xl outline-none focus:border-[#FFA9A9] shadow-md shadow-[#cdcdcd50] flex-1 py-1 px-2 text-[10px]"
              />
              {errors.correo && (
                <p className="ml-3 text-red-500 text-sm absolute">
                  Campo necesario
                </p>
              )}
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className="cursor-pointer flex justify-center items-center bg-[#72C9DC] px-3 py-1 rounded-2xl text-white "
              >
                <p className="font-mono font-bold">Enviar</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
