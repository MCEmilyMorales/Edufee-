'use client'

import FormInput from "@/components/FormInput";
import { registerStudent } from "@/helpers/student.helper";
import { FormDataStudent, useFormStudent } from "@/hooks/useFormStudent";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import FormSelect from "@/components/FormSelect";
import { tokenStore } from "@/store/tokenStore";
import { getInstitutionsNames } from "@/helpers/institution.helper";

const StudentRegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const token = tokenStore((state) => state.token);
  const SetToken = tokenStore((state) => state.setToken);
  const initialState: FormDataStudent = {
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    direccion: "",
    telefono: "",
    institucion: ""
  };
  const router = useRouter()
  const { formData, errors, handleChange, handleFileChange,handleSubmitStudentImageProfile, validate, setFormData } = useFormStudent(initialState);
  const { user } = useUser()
  const [institutions, setInstitutions] = useState<string[]>([]);

  console.log(formData)

  const fetchInstitutions = async() => {
    try {
      const institutions = await getInstitutionsNames();
      setInstitutions(institutions);
      setFormData((prevData) => ({
        ...prevData,
        institucion: institutions[0] || "",
      }));
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(()=> {
    fetchInstitutions();
  },[])
  
  if (isLoading) {
    return <div className="h-[90vh] text-lg">Loading student form...</div>;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validate() && user) {

      formData.email = user?.email!;

      try {
        const studentId = await registerStudent(formData);
        await handleSubmitStudentImageProfile(studentId);
        SetToken(studentId)
        alert("Estudiante creado exitosamente")

        router.push("/student/dashboard")
      } catch (error) {
        alert("Ocurrió un error al registrar el usuario")
        console.log(error);
      }

    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md p-8 bg-[#8db2f3] border-2 border-black shadow-lg rounded-[2em] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Registro de Estudiante</h2>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="nombre"
            label="Nombre"
            placeholder="John"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
          />

          <FormInput
            type="text"
            name="apellido"
            label="Apellido"
            placeholder="Doe"
            value={formData.apellido}
            onChange={handleChange}
            error={errors.apellido}
          />
          <FormInput
            type="text"
            name="dni"
            label="DNI"
            placeholder="96021093"
            value={formData.dni}
            onChange={handleChange}
            error={errors.dni}
          />
          <FormInput
            type="text"
            name="direccion"
            label="Dirección"
            placeholder="Calle falsa 123"
            value={formData.direccion}
            onChange={handleChange}
            error={errors.direccion}
          />
          <FormInput
            type="text"
            name="telefono"
            label="Teléfono"
            placeholder="1123908799"
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
          />
          <FormSelect
            name="institucion"
            value={formData.institucion}
            label="Selecciona una institución"
            onChange={handleChange}
            options={institutions}
          />
          <div>
            <label htmlFor="photo-profile" className="mt-2 block font-bold">Subir foto de perfil (opcional)</label>
            <input
              id="photo-profile"
              type="file"
              name="fotoPerfil"
              className="w-full p-3 border bg-gray-300 border-gray-300 rounded-md"
              onChange={handleFileChange}
            />
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
