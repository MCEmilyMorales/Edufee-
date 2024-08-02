"use client";

import CheckoutPage from "../../components/checkoutPage/CheckoutPage";
import convertToSubcurrency from "../../../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const amount = 4.4;

  return (
    <main
      className="relative overflow-auto font-inter h-screen flex flex-col items-center  space-y-8 text-white text-center border
     bg-gradient-to-tr from-blue-500 to-purple-500 pb-32"
    >
      <div className=" mt-32 ">
        <h1 className="text-4xl font-semibold mb-2">Institucion A</h1>
        <h2 className="text-2xl">
          tiene un cobro por:
          <span className="font-bold font-inter"> ${amount}</span> pesos
        </h2>
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
