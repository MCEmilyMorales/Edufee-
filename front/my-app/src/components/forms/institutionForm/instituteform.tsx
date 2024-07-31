import Link from "next/link";
import React from "react";

const instituteForm: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <div className="w-full max-w-md p-8 bg-[#FFDA16] border-2 border-black shadow-lg rounded-[2em] flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Registro de Institución</h2>
        <form className="w-full space-y-4">
          <input
            type="text"
            placeholder="Nombre de la Institución"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Dirección"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Numero de cuenta"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <label htmlFor="logo" className="mt-2 block">
            Subir Logo
          </label>
          <input
            id="logo"
            type="file"
            className="w-full p-3 border bg-gray-300 border-gray-300 rounded-md"
            placeholder="Subir Logo"
          />

          <label htmlFor="banner" className="mt-2 block">
            Banner
          </label>
          <input
            id="banner"
            type="file"
            className="w-full p-3 border bg-gray-300 border-gray-300 rounded-md"
            placeholder="Subir banner"
          />
            <button
              type="submit"
              className="w-full mt-4 p-3 bg-[#16ABFF] border-2 border-black text-white rounded-md shadow-lg hover:bg-[#1657FF] transition-colors duration-300"
            >
              Registrar
            </button>
        </form>
      </div>
    </div>
  );
};

export default instituteForm;
