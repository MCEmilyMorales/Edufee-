'use client'

import { uploadStudentImageProfile } from '@/helpers/student.helper';
import { useState } from 'react';

export interface FormDataStudent {
  nombre: string,
  apellido: string,
  dni: string,
  email: string,
  telefono: string,
  direccion: string,
  institucion: string
}

export const useFormStudent = (initialState: FormDataStudent) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);

  console.log("FOto de perfil", file)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleSubmitStudentImageProfile = async(userId: string) => {
    if (file) {
      await uploadStudentImageProfile(userId, file);
    }
  }

  const validate = () => {
    const newErrors: any = {};
    
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido) newErrors.apellido = "El apellido es obligatorio";
    if (!formData.dni) newErrors.dni = "El DNI es obligatorio";
    if (!formData.telefono)  newErrors.telefono = "El teléfono es obligatorio";
    if (!formData.institucion) newErrors.institucion = "La institución es obligatoria";

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error); 
  };

  return {
    formData,
    errors,
    handleChange,
    handleFileChange,
    handleSubmitStudentImageProfile,
    validate,
    setFormData,
  };
};
