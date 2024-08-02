export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main
      className="relative overflow-auto font-inter h-screen flex flex-col items-center  space-y-8 text-white text-center border
     bg-gradient-to-tr from-blue-500 to-purple-500 pb-32"
    >
      <div className="mt-32 p-4">
        <h1 className="text-4xl font-extrabold mb-2">Gracias</h1>
        <h2 className="text-2xl">Pago enviado a ISTITUCION A</h2>

        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          Institucion A por: ${amount}
        </div>
      </div>
    </main>
  );
}
