"use client";
import React from "react";
import Insitucion from "./institicion";
import Estudiante from "./estudiante";

export default function Home() {
  return (
    <main className="relative bg-gradient-radial from-[#e0f5f3] to-[#ffffff] min-h-screen flex flex-col items-center overflow-auto">
      <div className="mt-32 h-[60vh] min-h-[650px] max-w-[1400px] flex flex-col mb-[20em] justify-between">
        <Insitucion />
        <Estudiante />
      </div>
    </main>
  );
}
