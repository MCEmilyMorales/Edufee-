"use client";

import React from "react";
import FormInput from "@/components/FormInputInstitution";
import { FormDataInstitute, useFormInstitute } from "@/hooks/useFormInstitute";
import { useRouter } from "next/navigation";
import { registerInstitution } from "@/helpers/institution.helper";
import { useUser } from "@auth0/nextjs-auth0/client";

const InstituteRegisterForm: React.FC = () => {
  const initialState: FormDataInstitute = {
    nombreInstitucion: "",
    direccion: "",
    telefono: "",
    numeroCuenta: "",
    email: "",
    logo: new File([], ""),
    banner: new File([], ""),
  };
  const router = useRouter();
  const { formData, errors, handleChange, validate } =
    useFormInstitute(initialState);
  const { user } = useUser();

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData)
    if (validate() && user) {
      formData.email = user?.email!;
      user.name = formData.nombreInstitucion;

      console.log("hola")
      try {
        const response = await registerInstitution(formData);
        alert(" Institución registrada correctamente")
        router.push("/verificacionInstitucion")
      } catch(error) {
        alert("Ocurrio un error al registrar una institution")
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md p-8 bg-[#FFDA16] border-2 border-black shadow-lg rounded-[2em] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Registro de Institución</h2>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="nombreInstitucion"
            placeholder="Nombre de la Institución"
            value={formData.nombreInstitucion}
            onChange={handleChange}
            error={errors.nombreInstitucion}
          />
          <FormInput
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            error={errors.direccion}
          />
          <FormInput
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
          />
          <FormInput
            type="text"
            name="numeroCuenta"
            placeholder="Número de cuenta"
            value={formData.numeroCuenta}
            onChange={handleChange}
            error={errors.numeroCuenta}
          />

          <div>
            <label htmlFor="logo" className="mt-2 block">
              Subir Logo
            </label>
            <input
              id="logo"
              type="file"
              name="logo"
              className="w-full p-3 border bg-gray-300 border-gray-300 rounded-md"
              onChange={handleChange}
            />
            {errors.logo && (
              <p className="text-red-500">
                Debes subir el logo de la institución
              </p>
            )}
          </div>
          <div>
            <label htmlFor="banner" className="mt-2 block">
              Subir Banner
            </label>
            <input
              id="banner"
              type="file"
              name="banner"
              className="w-full p-3 border bg-gray-300 border-gray-300 rounded-md"
              onChange={handleChange}
            />
            {errors.banner && (
              <p className="text-red-500">
                Debes subir el banner de la institución
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-[#16ABFF] border-2 border-black text-white rounded-md shadow-lg hover:bg-[#1657FF] transition-colors duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstituteRegisterForm;
