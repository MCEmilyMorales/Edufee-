import React from "react";

interface CardGeneralProps {
  text: string;
  borderColor?: string;
  bgColor?: string;
  shadowColor?: string;
  shadowPosition?: { x: number; y: number };
  className?: string;
}

const CardGeneral: React.FC<CardGeneralProps> = ({
  text,
  bgColor = "orange",
  borderColor = "black",
  shadowColor = "blue",
  shadowPosition = { x: -10, y: 10 },
  className,
}) => {
  return (
    <div
      className={`flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 
       text-white rounded-[2em] sm:rounded-[2em] md:rounded-[2em] lg:rounded-[4em] xl:rounded-[6em] 
      max-w-[650px] max-h-[300px] border-4 ${className}`}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        boxShadow: `${shadowPosition.x}px ${shadowPosition.y}px 0 0 ${shadowColor}`,
      }}
    >
      <p className="text-base text-black sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ">
        {text}
      </p>
    </div>
  );
};

export default CardGeneral;
