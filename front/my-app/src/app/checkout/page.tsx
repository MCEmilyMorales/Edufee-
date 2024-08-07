"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CheckoutPage from "../../components/checkoutPage/CheckoutPage";
import convertToSubcurrency from "../../../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { DataUser } from "../../store/userData";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

function CheckoutContent() {
  const getData = DataUser((state) => state.getDataUser);
  const userData = DataUser((state) => state.userData);
  const nombreCompleto = `${userData.name} ${userData.lastname}`;
  const searchParams = useSearchParams();
  const router = useRouter();
  const amountParam = searchParams.get("amount");
  const referenceParam = searchParams.get("reference");
  const [amount, setAmount] = useState<number>(1);
  const [reference, setReference] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (amountParam) {
      const parsedAmount = parseFloat(amountParam);
      if (!isNaN(parsedAmount)) {
        setAmount(parsedAmount);
      }
    }
    if (referenceParam) {
      setReference(referenceParam);
    }
  }, [amountParam, referenceParam]);

  useEffect(() => {
    if (amount) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [amount]);

  return (
    <main className="relative overflow-auto font-inter h-screen flex flex-col items-center space-y-8 text-white text-center border bg-gradient-to-tr from-blue-500 to-green-500 pb-32">
      <div className="mt-32">
        <h1 className="text-4xl font-semibold mb-2">
          <span className="font-bold font-inter">Estudiante </span>
          {nombreCompleto}
        </h1>
        <h1 className="text-4xl font-semibold mb-2">
          a la institucion:{" "}
          {userData.institution
            ? userData.institution.name
            : "Institución no disponible"}
        </h1>
        <h2 className="text-2xl flex items-center space-x-2">
          <span className="font-regular font-inter mx-auto">
            $ {amount.toFixed(2)} pesos
          </span>
        </h2>
        <h3 className="text-lg font-medium mt-4">Referencia: {reference}</h3>
        <button
          onClick={() => router.back()}
          className="p-2 bg-orange-300 text-black rounded hover:bg-orange-400 mt-8"
        >
          Cambiar monto
        </button>
      </div>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutPage amount={amount} reference={reference} />
        </Elements>
      ) : (
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
      )}
    </main>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
