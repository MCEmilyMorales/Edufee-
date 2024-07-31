'use client'

import { useState } from 'react';

export const useFormStudent = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
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
