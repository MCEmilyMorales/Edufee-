'use client';

import React from "react";
import FormInput from "@/components/FormInput";
import FormTextArea from "@/components/FormTextArea";
import { FormDataContactUs, useContactForm } from "@/hooks/useContactForm";

const ContactForm: React.FC = () => {
  const initialState: FormDataContactUs = {
    name: "",
    email: "",
    message: ""
  };
  const { formData, errors, handleChange, handleSubmit } = useContactForm(initialState);
  console.log(formData)

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-[#e0f5f3] to-[#d0a4e4] border-2 border-black shadow-lg rounded-[2em] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Contáctenos</h2>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="name"
            label="Nombre"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormInput
            type="email"
            name="email"
            label="Email"
            placeholder="tuemail@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormTextArea
            name="message"
            placeholder="Tengo una consulta sobre..."
            label="Deja tu mensaje"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
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
