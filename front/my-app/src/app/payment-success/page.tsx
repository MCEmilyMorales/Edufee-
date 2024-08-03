"use client";

import { useState } from "react";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const [loading, setLoading] = useState(false);

  const studentName = "Estudiante";

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/downloadPDF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          institution: "Institucion A",
          studentName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "receipt.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative overflow-auto font-inter h-screen flex flex-col items-center space-y-8 text-white text-center border
     bg-gradient-to-tr from-blue-500 to-green-500 pb-32"
    >
      <div className="mt-32 p-4">
        <h1 className="text-4xl font-extrabold mb-2">Gracias, {studentName}</h1>

        <div className="bg-white p-2 rounded-md text-blue-600 mt-5 text-4xl font-bold">
          Pago enviado a Institucion A por: ${amount}
        </div>

        <button
          onClick={handleDownloadPDF}
          className="mt-8 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Generando PDF..." : "Descargar PDF"}
        </button>
      </div>
    </main>
  );
}
