"use client";
import { useEffect, useState } from "react";
import { DataUser } from "../../store/userData";

const TokenPage = () => {
  const userData = DataUser((state) => state.userData);
  const getData = DataUser((state) => state.getDataUser);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          User Information
        </h1>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Name:</p>
          <p className="text-gray-900">{userData.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Last Name:</p>
          <p className="text-gray-900">{userData.lastname}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Email:</p>
          <p className="text-gray-900">{userData.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">DNI:</p>
          <p className="text-gray-900">{userData.dni}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Address:</p>
          <p className="text-gray-900">{userData.address}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Phone:</p>
          <p className="text-gray-900">{userData.phone}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">Role:</p>
          <p className="text-gray-900">{userData.role}</p>
        </div>
        {userData.imgProfile && <div className="mb-4"></div>}
      </div>
    </div>
  );
};

export default TokenPage;
