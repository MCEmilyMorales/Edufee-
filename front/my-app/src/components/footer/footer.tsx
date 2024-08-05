import React from "react";
import BotonLink from "../botonLink/boton";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-[100%] bg-[#C9EBFF] min-h-24   bottom-0 text-black  flex items-center justify-between p-0 overflow-hidden">
      <div className="relative flex flex-row w-full h-full justify-between">
        <div className="//bg-red-800 flex flex-col p-4 min-w-[20px]">
          <p className="text-center font-bold text-auto font-sans">
            Contactanos a traves de:
          </p>
          <p className="text-left font-sans">+569 12345678</p>
          <a href="mailto:p5i9b@example.com" className="text-left">
            Alguien@example.com
          </a>
        </div>
        <div className="text-center justify-center flex flex-col p-4">
          <p className="text-auto //bg-red-800">
            <b className="font-sans">© 2024 Edufee. </b>Todos los derechos
            reservados.
          </p>
        </div>
        <div className=" //bg-red-800 h-full p-4">
          <p className="text-center font-bold text-auto pt-2">
            ¿Donde nos encontramos?
          </p>
          <p className=" text-center text-auto pt-4">
            Calle <b className="font-sans font-normal">123</b>, San Francisco,{" "}
            <b className="font-sans font-normal">94111</b>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
