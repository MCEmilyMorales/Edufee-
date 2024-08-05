import React from "react";
import BotonLink from "../botonLink/boton";

const Footer: React.FC = () => {
  return (
    <footer className="w-full  bg-[#C9EBFF]  text-black h-max flex items-center justify-between p-6 bottom-0">
      <div>
        <p className="text-center font-bold text-lg font-sans">
          Contactanos a traves de:
        </p>
        <p className="text-left font-sans">+569 12345678</p>
        <a href="mailto:p5i9b@example.com" className="text-left">
          Alguien@example.com
        </a>
      </div>
      <div>
        <p className="text-center text-lg">
          <b className="font-sans">© 2024 Edufee. </b>Todos los derechos
          reservados.
        </p>
      </div>
      <div className="h-24">
        <p className="text-center font-bold text-lg pt-2">
          ¿Donde nos encontramos?
        </p>
        <p className="text-center pt-4">
          Calle <b className="font-sans font-normal">123</b>, San Francisco,{" "}
          <b className="font-sans font-normal">94111</b>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
