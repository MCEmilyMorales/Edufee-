import Link from "next/link";
import React from "react";

const userForm: React.FC = () => {
  return (
    <div className="w-full max-w-md p-8 bg-[#FFDA16] border-2 border-black shadow-lg rounded-[2em] flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Registro de Estudiante</h2>
      <form className="w-full space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Apellido"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="DNI"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="file"
          className="w-full p-3 border bg-gray-300 border-gray-300 rounded-md"
          placeholder="Subir foto de perfil"
        />

        <Link href="/usuario">
          <button
            type="submit"
            className="w-full p-3 bg-[#16ABFF] border-2 border-black text-white rounded-md shadow-lg hover:bg-[#1657FF] transition-colors duration-300"
          >
            Registrar
          </button>
        </Link>
      </form>
    </div>
  );
};

export default userForm;
