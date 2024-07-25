import React from "react";
import BotonLink from "../botonLink/boton";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#C9EBFF] fixed bottom-0 text-white h-24 flex items-center">
      <ul className="flex flex-col gap-0 pl-4 text-black">
        <BotonLink link="/" text="placeholder" />
        <BotonLink link="/b" text="placeholder" />
        <BotonLink link="/c" text="placeholder" />
      </ul>
    </footer>
  );
};

export default Footer;
