import React from "react";

const Landing: React.FC = () => {
  return (
    <div
      className="
        
        w-full
        max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md
        relative
        border-t-8 border-l-8 border-r-8 border-black
        shadow-[0px_0px_40.5px_rgba(0,0,0,0.68)]
        rounded-t-[4em] sm:rounded-t-[8em] lg:rounded-t-[8em] 
        bg-white
        border-b-0
        border-[10px_solid_#24282b]
        box-border
        h-screen
        mt-20 sm:mt-16 md:mt-24 lg:mt-32
        flex
        flex-col
        items-center
      "
    >
      <div
        className="
          mt-8 sm:mt-8 md:mt-16 lg:mt-24
          w-auto max-w-[80%]
          rounded-[2em] sm:rounded-[2em] lg:rounded-[2em] 
          bg-[#FFDA16]
          border-2 border-black
          shadow-lg
          flex
          items-center
          justify-center
          text-center
          p-6
          font-raleway
          leading-tight
          h-max
        "
      >
        <p className="text-lg font-raleway sm:text-xl md:text-2xl lg:text-3xl text-black">
          <span className="font-raleway font-bold text-red-500">edufee</span> es
          la herramienta que simplifica todo para ti, ya seas una institución
          educativa o un usuario que necesita hacer pagos. ¡Todo en un solo
          lugar!
        </p>
      </div>
      <a
        href="https://www.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="
            mt-6 sm:mt-8 md:mt-16 lg:mt-12
            w-auto max-w-[80%]
            rounded-[2em]
            bg-[#16ABFF]
            border-2 border-black
            shadow-lg
            flex
            items-center
            justify-center
            text-center
            p-6
            font-raleway
            leading-tight
            h-max
            text-black
            ml-[30%] sm:ml-[25%] md:ml-[40%] lg:ml-[40%]
            hover:bg-[#1657FF] /* Adjust this to your desired hover color */
            hover:text-white
            transition-colors duration-300
        "
      >
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Quiero saber más!
        </p>
      </a>
    </div>
  );
};

export default Landing;
