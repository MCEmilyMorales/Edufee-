'use client'
import React, { useState } from "react";
import Sidebar, { SidebarItem } from "../sidebarAdmin/page";
import { User, School } from "lucide-react";

const StudentsTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Institucion</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">Ultimo pago</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">Nombre Alumno</td>
              <td className="px-4 py-2 border">Nombre Institucion</td>
              <td className="px-4 py-2 border bg-green-200">PAGO/PENDIENTE</td>
              <td className="px-4 py-2 border">DD/MM/AA</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InstitutionsTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Institución</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">Alumnos</th>
            <th className="px-4 py-2 border">Último cobro</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">Nombre Institución</td>
              <td className="px-4 py-2 border bg-green-200">PAGO/PENDIENTE</td>
              <td className="px-4 py-2 border">Número de Alumnos</td>
              <td className="px-4 py-2 border">DD/MM/AA</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState("students");

  return (
    <div className="flex pt-20 h-screen">
      <Sidebar>
        <SidebarItem
          icon={<User />}
          text="Alumnos"
          active={view === "students"}
          onClick={() => setView("students")}
        />
        <SidebarItem
          icon={<School />}
          text="Instituciones"
          active={view === "institutions"}
          onClick={() => setView("institutions")}
        />
      </Sidebar>
      <div className="flex-1 p-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Nombre, ID, correo"
            className="border rounded-lg px-4 py-2 w-full"
          />
          <button className="ml-2 p-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            🔍
          </button>
        </div>
        {view === "students" ? <StudentsTable /> : <InstitutionsTable />}
      </div>
    </div>
  );
};

export default App;
