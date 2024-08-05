'use client'

import FormInput from "@/components/FormInputStudent";
import { registerStudent } from "@/helpers/student.helper";
import { FormDataStudent, useFormStudent } from "@/hooks/useFormStudent";
import { useRouter } from "next/navigation";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import FormSelect from "@/components/FormSelect";

const StudentRegisterForm: React.FC = () => {
  const initialState: FormDataStudent = {
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    direccion: "",
    telefono: "",
    institucion: "",
    fotoPerfil: new File([], ""),
  };
  const router = useRouter()
  const { formData, errors, handleChange, validate } = useFormStudent(initialState);
  const { user } = useUser()

  console.log(formData)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validate() && user) {

      formData.email = user?.email!;
      user.name = formData.nombre;

      try {
        const response = await registerStudent(formData);
        alert("Estudiante creado exitosamente")

        router.push("/student/dashboard")
      } catch (error) {
        alert("Ocurrio un error al registrar el usuario")
        console.log(error);
      }

    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md p-8 bg-[#FFDA16] border-2 border-black shadow-lg rounded-[2em] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Registro de Estudiante</h2>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
          />
          <FormInput
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            error={errors.apellido}
          />
          <FormInput
            type="text"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
            onChange={handleChange}
            error={errors.dni}
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
          <FormSelect
            name="institucion"
            value={formData.institucion}
            onChange={handleChange}
            options={["Institution A", "Institution B"]}
          />
          <div>
            <label htmlFor="photo-profile" className="mt-2 block">Subir foto de perfil</label>
            <input
              id="photo-profile"
              type="file"
              name="fotoPerfil"
              className="w-full p-3 border bg-gray-300 border-gray-300 rounded-md"
              onChange={handleChange}
            />
            {errors.fotoPerfil && <p className="text-red-500">{errors.fotoPerfil}</p>}
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full p-3 bg-[#16ABFF] border-2 border-black text-white rounded-md shadow-lg hover:bg-[#1657FF] transition-colors duration-300 mt-4"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegisterForm;
