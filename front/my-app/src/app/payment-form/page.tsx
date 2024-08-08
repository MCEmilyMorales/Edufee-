"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DataUser } from "../../store/userData";

export default function FormPage() {
  const [amount, setAmount] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const getData = DataUser((state) => state.getDataUser);
  const userData = DataUser((state) => state.userData);

  const nombreCompleto = `${userData.name} ${userData.lastname}`;

  // Function to generate a unique reference number
  const generateUniqueReference = () => {
    const timestamp = Date.now().toString(36); // Convert timestamp to base-36 string
    const randomValue = Math.random().toString(36).substr(2, 6); // Generate a random base-36 string
    return `${timestamp}-${randomValue}`;
  };

  // Set a unique reference number when the form is loaded
  useState(() => {
    setReference(generateUniqueReference());
  }, []);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      if (parseFloat(value) >= 1 || value === "") {
        setError("");
      }
    }
  };

  const handleReferenceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReference(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (parsedAmount >= 1) {
      router.push(
        `/checkout?amount=${parsedAmount}&reference=${encodeURIComponent(
          reference
        )}`
      );
    } else {
      setError("No se aceptan pagos debajo de $ 1.00");
    }
  };

  return (
    <main className="relative overflow-auto font-inter h-screen flex flex-col items-center space-y-8 text-white text-center border bg-gradient-to-tr from-blue-500 to-green-500 pb-32">
      <div className="mt-32 items-center flex flex-col">
        <h1 className="text-4xl font-semibold mb-2">
          <span className="font-bold font-inter">Estudiante</span>{" "}
          {nombreCompleto}
        </h1>
        <h2 className="text-2xl mb-4 flex-wrap max-w-[400px]">
          Ingrese el monto a pagar para la institucion:{" "}
          <span className="font-bold font-inter">
            {userData.institution?.name}
          </span>
        </h2>
        <form
          className="flex flex-col items-center space-y-4 mb-8 max-w-[200px]"
          onSubmit={handleSubmit}
        >
          <div className="relative w-max">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="p-2 pl-6 border rounded text-gray-800 placeholder-gray-400 max-w-[200px]"
              placeholder="0.00"
            />
            <span className="pr-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
              $
            </span>
          </div>
          <div className="relative max-w-full">
            <p>Referencia unica de pago</p>
            <input
              type="text"
              value={reference}
              onChange={handleReferenceChange}
              className="p-2 border rounded text-gray-800 placeholder-gray-400 max-w-full"
              placeholder="Referencia de pago"
              disabled
            />
          </div>
          {error && (
            <p className="text-white font-regular text-sm mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Proceder al pago
          </button>
        </form>
      </div>
    </main>
  );
}
