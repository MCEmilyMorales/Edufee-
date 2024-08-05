import Link from "next/link";
import React from "react";
import Image from "next/image";

const Ladingbf = () => {
  return (
    <div className="pt-24">
      <div className="bg-[#7EDA94] absolute left-1/2  transform -translate-x-1/2 rounded-[50px] w-[800px] h-[500px]">
        <p className="text-[32px] py-16 pl-14  w-[600px] h-[500px] z-20">
          <b className="text-[42px] italic font-bold">Edufee</b> es la
          herramienta que simplifica todo para ti, ya seas una institucion
          educativa o un usuario que necesita hacer pagos. ¡Todo en un solo
          lugar!
        </p>
      </div>
      <div className="rounded-[3rem] w-[370px] h-[250px] overflow-hidden absolute border-[10px] border-[#42BD82] ml-[1050px] mt-[180px]">
        <Image
          src="/landinguse.png"
          alt=""
          width={400}
          height={500}
          className="object-cover h-full"
        />
      </div>
      <div className="absolute z-10 ml-[900px] mt-[380px]">
        <button className="bg-[#F7FFD0] font-bold rounded-[50px] w-[320px] h-[70px] border-2 border-black shadow-custom">
          <Link className="text-[22px] " href="/select">
            ¡Dale click para saber más!
          </Link>
        </button>
      </div>
      <div className="absolute ml-[460px] mt-[370px]">
        <svg
          width="265"
          height="265"
          viewBox="0 0 263 263"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="131.5" cy="131.5" r="131.5" fill="#42BD82" />
          <path
            d="M77 90C80 118.491 106.3 174.757 187.5 171.895"
            stroke="white"
            stroke-width="13"
            stroke-linecap="round"
          />
          <path
            d="M242 124C240.643 111.839 228.742 87.8232 192 89.0449"
            stroke="white"
            stroke-width="13"
            stroke-linecap="round"
          />
          <path
            d="M152 64C150.643 51.8392 138.742 27.8232 102 29.0449"
            stroke="white"
            stroke-width="13"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Ladingbf;
