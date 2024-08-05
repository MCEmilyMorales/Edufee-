"use client";

import React, { useState } from "react";
import UsuarioForm from "@/components/forms/studentForm/userform";
import InstitucionForm from "@/components/forms/institutionForm/instituteform";

const Register: React.FC = () => {
  const [activeForm, setActiveForm] = useState<
    "usuario" | "institucion" | null
  >(null);

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <h1 className="text-3xl font-bold mb-4">
        ¿Eres{" "}
        <span
          onClick={() => setActiveForm("usuario")}
          className={`cursor-pointer transition-colors duration-300 ${
            activeForm === "usuario"
              ? "text-[#55A058]  "
              : "text-black hover:text-[#55A058]"
          }`}
        >
          Estudiante
        </span>{" "}
        o{" "}
        <span
          onClick={() => setActiveForm("institucion")}
          className={`cursor-pointer transition-colors duration-300 ${
            activeForm === "institucion"
              ? "text-[#55A058] "
              : "text-black hover:text-[#55A058]"
          }`}
        >
          Institución
        </span>
        ?
      </h1>
      <div className="w-full max-w-md">
        {activeForm === "usuario" && <UsuarioForm />}
        {activeForm === "institucion" && <InstitucionForm />}
      </div>
    </div>
  );
};

export default Register;
