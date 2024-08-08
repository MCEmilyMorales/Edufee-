'use client';
import React, { useEffect, useState } from "react";
import Sidebar, { SidebarItem } from "../sidebarAdmin/page";
import { User, School, CheckSquare } from "lucide-react";
import { InstitutionsData } from "@/store/institutionsData";
import { DataUser } from "@/store/userData";

const StudentsTable = () => {
  const getData = DataUser((state) => state.getAllData);
  const dataUser = DataUser((state) => state.AllData);

  useEffect(() => {
    getData();
  }, [getData]);

  console.log(dataUser);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Institucion</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">DNI</th>
          </tr>
        </thead>
        <tbody>
          {dataUser[0]?.allUser?.map((user) => (
            <tr className="text-center">
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.phone}</td>
              <td className={`px-4 py-2 border ${user.status === 'true' ? "bg-green-200" : "bg-red-200"}`}>{user.status === 'true' ? "Aprobado" : "Rechazado"}</td>
              <td className="px-4 py-2 border">{user.dni}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InstitutionsTable = () => {
  const institutions = InstitutionsData((state) => state.institutions);
  const getInsti = InstitutionsData((state) => state.getInstitutions);
  console.log(institutions);

  useEffect(() => {
    getInsti();
  }, [getInsti]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Institución</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">Dirección fiscal</th>
            <th className="px-4 py-2 border">Último cobro</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((institution) => (
            <tr key={institution.id} className="text-center">
              <td className="px-4 py-2 border">{institution.name}</td>
              <td className={`px-4 py-2 border ${institution.isActive === true ? "bg-green-200" : "bg-red-200"}`}>{institution.isActive === true ? "Aprobado" : "Rechazado"}</td>
              <td className="px-4 py-2 border">{institution.address}</td>
              <td className="px-4 py-2 border">{institution.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ApproveInstitutions = () => {
  const institutions = InstitutionsData((state) => state.institutions);
  const updateInstitutionStatus = InstitutionsData((state) => state.updateInstitutionStatus);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombre de la institución</th>
            <th className="px-4 py-2 border">ID de institución</th>
            <th className="px-4 py-2 border">Dirección fiscal</th>
            <th className="px-4 py-2 border">Cuenta bancaria</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((institution) => (
            <tr key={institution.id} className="text-center">
              <td className="px-4 py-2 border">{institution.name}</td>
              <td className="px-4 py-2 border">{institution.id}</td>
              <td className="px-4 py-2 border">{institution.address}</td>
              <td className="px-4 py-2 border">{institution.accountNumber}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => updateInstitutionStatus(institution.id!, true)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => updateInstitutionStatus(institution.id!, false)}
                  className="px-2 py-1 bg-red-500 text-white rounded ml-2"> Rechazar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState("students");
  const getInstitutions = InstitutionsData((state) => state.getInstitutions);

  useEffect(() => {
    getInstitutions();
  }, [getInstitutions]);

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
        <SidebarItem
          icon={<CheckSquare />}
          text="Aprobar Instituciones"
          active={view === "approve"}
          onClick={() => setView("approve")}
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
        {view === "students" ? (
          <StudentsTable />
        ) : view === "institutions" ? (
          <InstitutionsTable />
        ) : (
          <ApproveInstitutions />
        )}
      </div>
    </div>
  );
};

export default App;
