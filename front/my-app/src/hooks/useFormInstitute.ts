import { useState } from "react";

export interface FormDataInstitute {
  nombreInstitucion: string;
  direccion: string;
  telefono: string;
  numeroCuenta: string;
  email: string,
  logo: string;
  banner: string;
}

export const useFormInstitute = (initialState: FormDataInstitute) => {
  const [formData, setFormData] = useState<FormDataInstitute>(initialState);
  const [errors, setErrors] = useState<any>(initialState);

  const validate = () => {
    const newErrors = {} as FormDataInstitute;
  
    if (!formData.nombreInstitucion) newErrors.nombreInstitucion = "El nombre de la institución es requerido";
    if (!formData.direccion) newErrors.direccion = "La dirección es requerida";
    if (!formData.telefono) newErrors.telefono = "El teléfono es requerido";
    if (!formData.numeroCuenta) newErrors.numeroCuenta = "El número de cuenta es requerido";
    if (!formData.logo ) newErrors.logo = "El logo es requerido";
    if (!formData.banner) newErrors.banner = "El banner es requerido";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return { formData, errors, handleChange, validate };
};
