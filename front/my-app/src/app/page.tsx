// app/page.tsx
import Image from "next/image";
import Landing from "../app/landing/page";

export default function Home() {
  return (
    <main className="relative bg-gradient-radial from-[#e0f5f3] to-[#ffffff] min-h-screen flex flex-col items-center overflow-auto p-4">
      <Landing />
    </main>
  );
}
