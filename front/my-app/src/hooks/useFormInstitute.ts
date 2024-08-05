'use client'

import { useState } from "react";

export interface FormDataInstitute {
  nombreInstitucion: string;
  direccion: string;
  telefono: string;
  numeroCuenta: string;
  email: string,
  logo: File;
  banner: File;
}

export const useFormInstitute = (initialState: FormDataInstitute) => {
  const [formData, setFormData] = useState<FormDataInstitute>(initialState);
  const [errors, setErrors] = useState<any>(initialState);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.nombreInstitucion) newErrors.nombreInstitucion = "El nombre de la institución es requerido";
    if (!formData.direccion) newErrors.direccion = "La dirección es requerida";
    if (!formData.telefono) newErrors.telefono = "El teléfono es requerido";
    if (!formData.numeroCuenta) newErrors.numeroCuenta = "El número de cuenta es requerido";
  
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const files = e.target instanceof HTMLInputElement && e.target.type === 'file' ? e.target.files : undefined;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  return { formData, errors, handleChange, validate };
};
