"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CheckoutPage from "../../components/checkoutPage/CheckoutPage";
import convertToSubcurrency from "../../../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amountParam = searchParams.get("amount");

  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    if (amountParam) {
      const parsedAmount = parseFloat(amountParam);
      if (!isNaN(parsedAmount)) {
        setAmount(parsedAmount);
      }
    }
  }, [amountParam]);

  return (
    <main
      className="relative overflow-auto font-inter h-screen flex flex-col items-center space-y-8 text-white text-center border
   bg-gradient-to-tr from-blue-500 to-green-500 pb-32"
    >
      <div className="mt-32">
        <h1 className="text-4xl font-semibold mb-2">Institucion A</h1>
        <h2 className="text-2xl flex items-center space-x-2">
          <span className="font-regular font-inter mx-auto">
            $ {amount.toFixed(2)} pesos
          </span>
        </h2>
        <button
          onClick={() => router.back()}
          className="p-2 bg-orange-300 text-black rounded hover:bg-orange-400 mt-8"
        >
          Cambiar monto
        </button>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
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
