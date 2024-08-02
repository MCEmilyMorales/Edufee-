import React from "react";
import SaberMas from "../SaberMas/SaberMas";

const Landing: React.FC = () => {
  return (
    <div className="bg-gradient-radial from-[#e0f5f3] to-[#ffffff] w-full min-h-screen flex">
      <div
        className="
          w-[90%] sm:w-[90%] md:w-[90%] lg:w-[950px]
          h-[500px] sm:h-[550px] md:h-[575px] lg:h-[600px]
          rounded-[1.5em] sm:rounded-[1.75em] lg:rounded-[2em]
          bg-[linear-gradient(120deg,#ceefb3_0%,#a8db51_41%,#57c5a2_68%,#5fad12_100%)]
          shadow-lg
          flex
          text-center
          items-center
          mx-auto
          top-16 sm:top-12 md:top-14 lg:top-16
          mt-4
          relative
        "
      >
        <p
          className="
            absolute
            top-8 sm:top-12 md:top-14 lg:top-16
            left-8 sm:left-12 md:left-14 lg:left-16
            w-[80%] sm:w-[70%] md:w-[65%] lg:w-[525px]
            text-left 
            text-[28px] sm:text-[30px] md:text-[32px] lg:text-[35px]
            text-black
          "
        >
          <span className="font-bold italic text-[28px] sm:text-[30px] md:text-[32px] lg:text-[35px] text-[#000000]">
            edufee {""}
          </span>
          es la herramienta que simplifica todo para ti, ya seas una institución
          educativa o un usuario que necesita hacer pagos. ¡Todo en un solo
          lugar!
        </p>
        <div
          className="
            absolute
            bottom-8 sm:bottom-12 md:bottom-14 lg:bottom-16
            right-8 sm:right-12 md:right-14 lg:right-16
          "
        >
          <SaberMas />
        </div>
      </div>
    </div>
  );
};

export default Landing;