"use client";

import React, { useState } from "react";
import UserList from "./UserList";
import InstitutionList from "./InstitutionList";
import PendingInstitutions from "./PendingInstitutions";
import { AiOutlineSearch } from "react-icons/ai";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "users" | "institutions" | "pending"
  >("users");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Placeholder data
  const users = [
    {
      id: 1,
      nombre: "Juan",
      apellido: "Prueba",
      dni: "12345678",
      foto: "https://thispersondoesnotexist.com/",
    },
    {
      id: 2,
      nombre: "Maria",
      apellido: "Prueba",
      dni: "87654321",
      foto: "https://thispersondoesnotexist.com/",
    },
  ];

  const institutions = [
    {
      id: 1,
      nombre: "Instituto A",
      numerocuenta: "1001",
      direccion: "123 Calle",
      telefono: "123-456-7890",
      logo: "/ruta",
      banner: "/ruta",
    },
    {
      id: 2,
      nombre: "Instituto B",
      numerocuenta: "1002",
      direccion: "456 Calle",
      telefono: "123-654-3210",
      logo: "/ruta",
      banner: "/ruta",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex items-center space-x-4 mb-4">
        <span
          onClick={() => setActiveTab("users")}
          className={`cursor-pointer font-semibold transition-colors duration-300 ${
            activeTab === "users"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-400"
          }`}
        >
          Usuarios
        </span>
        <span
          onClick={() => setActiveTab("institutions")}
          className={`cursor-pointer font-semibold transition-colors duration-300 ${
            activeTab === "institutions"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-400"
          }`}
        >
          Instituciones
        </span>
        <span
          onClick={() => setActiveTab("pending")}
          className={`cursor-pointer font-semibold transition-colors duration-300 ${
            activeTab === "pending"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-400"
          }`}
        >
          Pendiente
        </span>
      </div>

      <div className="mb-4 flex items-center space-x-2">
        <AiOutlineSearch className="text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div>
        {activeTab === "users" && <UserList users={users} />}
        {activeTab === "institutions" && (
          <InstitutionList institutions={institutions} />
        )}
        {activeTab === "pending" && <PendingInstitutions />}
      </div>
    </div>
  );
};

export default Dashboard;
