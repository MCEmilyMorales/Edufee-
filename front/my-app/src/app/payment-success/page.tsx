"use client";
import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DataUser } from "../../store/userData";
import { tokenStore } from "@/store/tokenStore";

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current 
        border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams.get("amount") || "0";
  const reference = searchParams.get("reference") || "";
  const userData = DataUser((state) => state.userData);
  const token = tokenStore((state) => state.token);
  const [loading, setLoading] = useState(false);

  const paymentRegisteredRef = useRef(false); // Use a ref to track if payment has been registered
  const registrationInProgressRef = useRef(false); // Ref to track if registration is in progress

  let userID = "";
  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userID = payload.id as string;
    }
  } catch (error) {
    console.error("Failed to decode token:", error);
  }

  useEffect(() => {
    const registerPayment = async () => {
      if (paymentRegisteredRef.current || registrationInProgressRef.current) {
        return; // Exit if payment has already been registered or is in progress
      }

      registrationInProgressRef.current = true; // Mark registration as in progress

      // Generate a unique identifier for this payment
      const transactionId = `${userID}-${amount}-${reference}`;

      // Check localStorage for existing registration status
      const hasRegistered = localStorage.getItem(transactionId);
      if (hasRegistered === "true") {
        console.log("Payment already registered");
        paymentRegisteredRef.current = true; // Mark as registered
        registrationInProgressRef.current = false;
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3005/payments/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`, // Uncomment if needed
            },
            body: JSON.stringify({
              amount: parseInt(amount, 10),
              institution: userData.institution?.name,
              studentName: userData.name,
              reference,
              pdfImage: userData.name,
              userId: userID,
              institutionId: userData.institution?.id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to register payment");
        }

        // Set flag in localStorage with unique identifier to indicate payment has been registered
        localStorage.setItem(transactionId, "true");
        paymentRegisteredRef.current = true; // Mark as registered
        console.log("Payment registered successfully");
      } catch (error) {
        console.error("Error registering payment:", error);
      } finally {
        registrationInProgressRef.current = false; // Reset registration status
      }
    };

    // Call registerPayment only once
    registerPayment();
  }, [amount, reference, userData, userID, token]);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/downloadPDF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // Uncomment if needed
        },
        body: JSON.stringify({
          amount,
          institution: userData.institution?.name,
          studentName: userData.name,
          reference,
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

  const handleNewPayment = () => {
    router.push("/payment-form");
  };

  return (
    <main className="relative overflow-auto font-inter h-screen flex flex-col items-center space-y-8 text-white text-center border bg-gradient-to-tr from-blue-500 to-green-500 pb-32">
      <div className="mt-32 p-4 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-2">
          Gracias, {userData.name}
        </h1>
        <div className="bg-white p-2 rounded-md text-blue-600 mt-5 text-4xl font-bold">
          Pago enviado a{" "}
          <span className="font-bold font-inter">
            {userData.institution
              ? userData.institution.name
              : "Institución no disponible"}
          </span>{" "}
          por: ${amount}
        </div>
        <button
          onClick={handleDownloadPDF}
          className="mt-8 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-40"
          disabled={loading}
        >
          {loading ? "Generando PDF..." : "Descargar PDF"}
        </button>
        <button
          onClick={handleNewPayment}
          className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600 w-40"
        >
          Generar nuevo pago
        </button>
      </div>
    </main>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentContent />
    </Suspense>
  );
}
