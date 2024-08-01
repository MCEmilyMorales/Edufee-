import React from "react";
import Link from "next/link";

const SaberMas: React.FC = () => {
  return (
    <div>
      <a
        href="/register"
        className="
        w-[300px] sm:w-[350px] md:w-[400px] lg:w-[425px]
        h-[100px] sm:h-[110px] md:h-[120px] lg:h-[125px]
        flex
        rounded-[2em] sm:rounded-[2.5em] lg:rounded-[3em]
        bg-[#f7ffd0]
        border-2 border-black
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]
        items-center
        text-black
        hover:bg-gradient-to-r from-[#d0a4e4] to-[#e0f5f3]
        hover:text-[#000000]
        transition-colors duration-300
        cursor-pointer
        justify-center
      "
      >
        <p className="font-bold text-[32px] sm:text-[35px] md:text-[38px] lg:text-[40px]">
          ¡Quiero saber más!
        </p>
      </a>
    </div>
  );
};

export default SaberMas;