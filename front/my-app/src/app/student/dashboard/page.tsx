"use client";

import React, { useEffect, useState } from "react";
import { DataUser } from "@/store/userData";
import { useRouter } from "next/navigation";

const DashboardStudent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleNewPayment = () => {
    router.push("/payment-form");
  };

  const getData = DataUser((state) => state.getDataUser);
  const userData = DataUser((state) => state.userData);

  useEffect(() => {
    // Simulate a delay for data fetching
    const fetchData = async () => {
      await getData(); // Assuming getData is asynchronous
      setLoading(false);
    };

    fetchData();
  }, [getData]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-gray-900 border-t-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center space-y-8">
      <h1 className="mt-24 text-2xl font-bold"></h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Informacion del estudiante
        </h1>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Nombre:</p>
          <p className="text-gray-900">{userData.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Apellido:</p>
          <p className="text-gray-900">{userData.lastname}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Correo:</p>
          <p className="text-gray-900">{userData.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">DNI:</p>
          <p className="text-gray-900">{userData.dni}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Direccion:</p>
          <p className="text-gray-900">{userData.address}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Telefono:</p>
          <p className="text-gray-900">{userData.phone}</p>
        </div>

        {userData.imgProfile && <div className="mb-4"></div>}
      </div>
      <button
        onClick={handleNewPayment}
        className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600 w-40"
      >
        Generar orden de pago
      </button>
    </div>
  );
};

export default DashboardStudent;
