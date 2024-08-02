"use client";
import React from "react";
import Insitucion from "./institicion";
import Estudiante from "./estudiante";

export default function Home() {
  return (
    <main className="relative bg-gradient-radial from-[#e0f5f3] to-[#ffffff] min-h-screen flex flex-col items-center overflow-auto p-4 ">
      <div className="mt-32 min-h-[550px] h-[650px] lg:h-[800px] //bg-red-100 max-w-[1400px] flex flex-col mb-[10em] max-h-[800px] //bg-red-200   justify-around ">
        <Insitucion />
        <Estudiante />
      </div>
    </main>
  );
}
