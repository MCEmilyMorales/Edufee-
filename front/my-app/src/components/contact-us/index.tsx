'use client';

import React from "react";
import FormInput from "@/components/FormInputStudent";
import FormSelect from "@/components/FormSelect";
import FormTextArea from "@/components/FormTextArea";
import { FormDataContactUs, useContactForm } from "@/hooks/useContactForm";

const ContactForm: React.FC = () => {
  const initialState: FormDataContactUs = {
    nombre: "",
    email: "",
    rol: "Estudiante",
    mensaje: ""
  };

  const { formData, errors, handleChange, handleSubmit } = useContactForm(initialState);

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md p-8 bg-[#FFDA16] border-2 border-black shadow-lg rounded-[2em] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Contáctenos</h2>
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormTextArea
            name="mensaje"
            placeholder="Mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            error={errors.mensaje}
          />
          <button
            type="submit"
            className="w-full p-3 bg-[#16ABFF] border-2 border-black text-white rounded-md shadow-lg hover:bg-[#1657FF] transition-colors duration-300 mt-4"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
