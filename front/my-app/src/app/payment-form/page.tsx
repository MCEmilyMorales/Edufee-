"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormPage() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const institutionName = "Nombre de la Institución";
  const userName = "Nombre del Estudiante";

  const handleAmountChange = (event: any) => {
    const value = event.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);

      if (parseFloat(value) >= 1 || value === "") {
        setError("");
      }
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const parsedAmount = parseFloat(amount);

    if (parsedAmount >= 1) {
      router.push(`/stripeTest?amount=${parsedAmount}`);
    } else {
      setError("No se aceptan pagos debajo de $ 1.00");
    }
  };

  return (
    <main
      className="relative overflow-auto font-inter h-screen flex flex-col items-center space-y-8 text-white text-center border
     bg-gradient-to-tr from-blue-500 to-green-500  pb-32"
    >
      <div className="mt-32">
        <h1 className="text-4xl font-semibold mb-2">
          <span className="font-bold font-inter">Estudiante</span> {userName}{" "}
        </h1>
        <h2 className="text-2xl mb-4">
          Ingrese el monto a pagar a:{" "}
          <span className="font-bold font-inter">{institutionName}</span>
        </h2>
        <form
          className="flex flex-col items-center space-y-4 mb-8"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="p-2 border rounded text-gray-800 placeholder-gray-400 pl-8"
              placeholder="0.00"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600">
              $
            </span>
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
