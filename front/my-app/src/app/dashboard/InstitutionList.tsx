"use client";

import React from "react";
import Image from "next/image";

interface Institution {
  id: number;
  nombre: string;
  numerocuenta: string;
  direccion: string;
  telefono: string;
  logo: string;
  banner: string;
}

interface InstitutionListProps {
  institutions: Institution[];
}

const InstitutionList: React.FC<InstitutionListProps> = ({ institutions }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <ul>
        {institutions.map((institution) => (
          <li key={institution.id} className="border-b py-4">
            <div className="flex flex-col space-y-2">
              <Image
                src={institution.logo}
                alt={`${institution.nombre} Logo`}
                width={64}
                height={64}
                className="object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{institution.nombre}</h3>
                <p>
                  <strong>Cuenta:</strong> {institution.numerocuenta}
                </p>
                <p>
                  <strong>Dirección:</strong> {institution.direccion}
                </p>
                <p>
                  <strong>Teléfono:</strong> {institution.telefono}
                </p>
              </div>
              <Image
                src={institution.banner}
                alt={`${institution.nombre} Banner`}
                width={600}
                height={200}
                className="w-full h-32 object-cover rounded-md"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstitutionList;
