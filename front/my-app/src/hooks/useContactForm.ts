'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface FormDataContactUs {
  nombre: string;
  email: string;
  rol: string;
  mensaje: string;
}

export const useContactForm = (initialState: FormDataContactUs) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors: any = {};
    tempErrors.nombre = formData.nombre ? "" : "Este campo es requerido.";
    tempErrors.email = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(formData.email) ? "" : "Email no válido.";
    tempErrors.mensaje = formData.mensaje ? "" : "Este campo es requerido.";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((value) => value === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {

      console.log("Formulario enviado:", formData);

      // try {
      //   const response = await fetch('/api/contact', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(formData)
      //   });

      //   if (response.ok) {
      //     alert("Mensaje enviado exitosamente.");
      //     router.push("/");
      //   } else {
      //     alert("Hubo un error al enviar el mensaje.");
      //   }
      // } catch (error) {
      //   console.error("Error al enviar el mensaje:", error);
      //   alert("Hubo un error al enviar el mensaje.");
      // }
      
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit
  };
};
