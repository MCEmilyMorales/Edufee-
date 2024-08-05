'use client'

import { useState } from 'react';

export interface FormDataStudent {
  nombre: string,
  apellido: string,
  dni: string,
  email: string,
  telefono: string,
  direccion: string,
  institucion: string,
  fotoPerfil: File,
}

export const useFormStudent = (initialState: FormDataStudent) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const files = e.target instanceof HTMLInputElement && e.target.type === 'file' ? e.target.files : undefined;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors: any = {};
    
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido) newErrors.apellido = "El apellido es obligatorio";
    if (!formData.dni) newErrors.dni = "El DNI es obligatorio";
    if (!formData.fotoPerfil) newErrors.fotoPerfil = "La foto de perfil es obligatoria";

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error); 
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
  };
};
