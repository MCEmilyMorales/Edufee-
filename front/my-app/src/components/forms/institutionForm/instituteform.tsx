"use client";

import React from "react";
import FormInput from "@/components/FormInput";
import { FormDataInstitute, useFormInstitute } from "@/hooks/useFormInstitute";
import { useRouter } from "next/navigation";
import { registerInstitution, uploadLogoBanner } from "@/helpers/institution.helper";
import { useUser } from "@auth0/nextjs-auth0/client";

const InstituteRegisterForm: React.FC = () => {
  const initialState: FormDataInstitute = {
    nombreInstitucion: "",
    direccion: "",
    telefono: "",
    numeroCuenta: "",
    email: "",
    logo: null,
    banner: null,
  };
  const router = useRouter();
  const { formData, errors, handleChange, validate } = useFormInstitute(initialState);
  const { user } = useUser();

  console.log(formData)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validate() && user) {
      formData.email = user?.email!;
      user.name = formData.nombreInstitucion;

      console.log("hola")
      try {
        const instituteId = await registerInstitution(formData);
        await uploadLogoBanner(formData, instituteId);
        
        alert(" Institución registrada correctamente")
        router.push("/verificacionInstitucion")
      } catch (error) {
        alert("Ocurrio un error al registrar una institution")
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md p-8 bg-[#F9B253] border-2 border-black shadow-lg rounded-[2em] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Registro de Institución</h2>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="nombreInstitucion"
            label="Nombre de la Institución"
            placeholder="Harvard University"
            value={formData.nombreInstitucion}
            onChange={handleChange}
            error={errors.nombreInstitucion}
          />
          <FormInput
            type="text"
            name="direccion"
            label="Dirección"
            placeholder="Street, City, State, Country"
            value={formData.direccion}
            onChange={handleChange}
            error={errors.direccion}
          />
          <FormInput
            type="text"
            name="telefono"
            label="Teléfono"
            placeholder="555-555-5555"
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
          />
          <FormInput
            type="text"
            name="numeroCuenta"
            label="Número de Cuenta"
            placeholder="1234567890"
            value={formData.numeroCuenta}
            onChange={handleChange}
            error={errors.numeroCuenta}
          />

          <div>
            <label htmlFor="logo" className="mt-2 block font-bold">
              Subir Logo (opcional)
            </label>
            <input
              id="logo"
              type="file"
              name="logo"
              className="w-full p-3 border bg-gray-300 border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="banner" className="mt-2 block font-bold">
              Subir Banner (opcional)
            </label>
            <input
              id="banner"
              type="file"
              name="banner"
              className="w-full p-3 border bg-gray-300 border-gray-300 rounded-md"
              onChange={handleChange}
            />
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
