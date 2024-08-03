"use client";
import React from "react";
import Image from "next/image";
import ButtonPop from "@/components/button-pop/buttonPop";

export const Landing: React.FC = () => {
  return (
    <main className="relative   min-h-screen flex flex-col items-center  p-4">
      <div className=" //bg-red-500 mt-16 xl:mt-20 max-w-[1000px] max-h-[1000px] items-center flex justify-center flex-col mb-32">
        <div className="relative //bg-black max-w-[750px] max-h-[auto]  xl:w-[750px] xl:h-[400px]  flex flex-row">
          <div className="max-w-[750px] max-h-[400px] bg-green-400 rounded-3xl min-w-[70%">
            <p className=" py-16 sm:text-lg md:text-xl lg:text-3xl xl:text-3xl pl-14 //bg-red-200 max-w-[80%] max-h[100%] ">
              <b className="text-[auto]  font-bold">
                Edufee : seguro, rápido y sencillo.
              </b>{" "}
              La herramienta que simplifica todo para ti, ya seas una
              institucion educativa o un usuario que necesita hacer pagos. ¡Todo
              en un solo lugar!
            </p>
          </div>
          <div className="h-[auto] rounded-lg //bg-slate-800  overflow-hidden min-w-[30%]">
            <div className="absolute rounded-3xl right-[1%] bottom-[15%] overflow-hidden max-w-[40%] border-8 border-[#42BD82]">
              <Image
                src="/landinguse.png"
                alt="Your SVG Description"
                className="w-[100%] h-[100%]"
                width={400}
                height={315}
              />
            </div>
          </div>
        </div>
        <div className="relative h-[200px] w-full //bg-blue-600 flex flex-row p-0">
          <div className="//bg-blue-100  w-[25%] left-10 top-[-20%] absolute p-0">
            <Image
              src="/edusmiley.svg"
              alt="Your SVG Description"
              className="w-[100%] h-[100%]"
              width={100}
              height={100}
              //style={{ filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' }}
            />
          </div>

          <div className="absolute //bg-red-500 h- w-[100%] h-[50px] right-[25%] top-[-25%]">
            <ButtonPop
              text="!Quiero saber más!"
              bgColor="#F7FFD0"
              textColor="black"
              route="/select"
              hoverBgColor="#5b06f9"
              hoverTextColor="white"
              shadowPosition={{ x: 5, y: 5 }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
