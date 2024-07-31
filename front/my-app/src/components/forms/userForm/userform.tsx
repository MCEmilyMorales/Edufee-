'use client'

import FormInput from "@/components/FormInput";
import { useFormStudent } from "@/helpers/useForm";
import { useRouter } from "next/navigation";
import React from "react";


const StudentForm: React.FC = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    dni: "",
    fotoPerfil: null,
  };
  const router = useRouter()
  const { formData, errors, handleChange, validate } = useFormStudent(initialState);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    
    if (validate()) {
      console.log("Datos del formulario:", formData);
      
      // Aquí iría la llamada a la API
      router.push("/usuario")   
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

export default StudentForm;
