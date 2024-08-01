"use client";
import React from "react";
import CardGeneral from "./cards/cardGeneral";
import ButtonGeneral from "./cards/buttonCard";
import Image from "next/image";

const Insitucion: React.FC = () => {
  return (
    <div className="p-0 relative flex flex-row top-0 //bg-blue-800 h-[max] max-w-[1400px]  max-h-[300px] min-w-[70%] justify-between items-center">
      <section className="p-0 relative flex flex-row top-0 //bg-green-200 h-[100%] max-w-[65%]">
        <CardGeneral
          text="¡Simplifica tu administración y enfócate en lo importante! Gestiona los pagos de tu institución de forma fácil y rápida con Edufee. Todo lo que necesitas en un solo lugar."
          bgColor="#F9B253"
          borderColor="#F98F53"
          shadowColor="#F1E5BE"
          shadowPosition={{ x: -10, y: 10 }}
        />
        <ButtonGeneral
          text="¡Quiero vincularme!"
          bgColor="#F7FFD0"
          textColor="black"
          route="/"
          hoverBgColor="#5b06f9"
          hoverTextColor="white"
        />
      </section>
      <div className="//bg-blue-100   w-[30%] h-[max] max-w-[30%] min-w-[30%] max-h-[full] flex flex-row items-center justify-center">
        <Image
          src="/LOGO1.svg"
          alt="Your SVG Description"
          className="w-[100%] h-[100%]"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

export default Insitucion;
