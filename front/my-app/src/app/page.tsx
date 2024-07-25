// app/page.tsx
import Image from "next/image";
import Landing from "@/components/landing/landing";

export default function Home() {
  return (
    <main className="bg-white h-screen flex flex-col items-center justify-center">
      <Landing />
    </main>
  );
}
