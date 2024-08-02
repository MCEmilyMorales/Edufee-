import React from "react";
import CardGeneral from "./cards/cardGeneral";
import ButtonGeneral from "./cards/buttonCard";
import Image from "next/image";

const Estudiante: React.FC = () => {
  return (
    <div className="p-0 relative flex flex-row top-0 //bg-blue-800 h-[max] max-w-[1400px]  max-h-[300px] min-w-[70%] justify-between items-center">
      <div className="//bg-blue-100   w-[30%] h-[max] max-w-[30%] min-w-[30%] max-h-[full] flex flex-row items-center justify-center">
        <Image
          src="/LOGO2.svg"
          alt="Your SVG Description"
          className="w-[100%] h-[100%]"
          width={100}
          height={100}
          //style={{ filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' }}
        />
      </div>
      <section className="p-0 relative flex flex-row top-0 //bg-green-200 h-[100%] max-w-[65%]">
        <CardGeneral
          text="Pagos Simples y Rápidos.
          Realiza tus pagos educativos sin complicaciones con Edufee. Rápido, seguro y todo en un solo lugar. ¡Hazlo fácil con Edufee!"
          bgColor="#78A3F6"
          borderColor="#334292"
          shadowColor="#A8C5F4"
          shadowPosition={{ x: -10, y: 10 }}
        />
        <ButtonGeneral
          text="¡Quiero iniciar!"
          bgColor="#F7FFD0"
          textColor="black"
          route="/student"
          hoverBgColor="#5b06f9"
          hoverTextColor="white"
        />
      </section>
    </div>
  );
};

export default Estudiante;
