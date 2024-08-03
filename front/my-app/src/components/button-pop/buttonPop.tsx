"use client";
import React, { useState } from "react";
import Link from "next/link";

interface ButtonProps {
  text: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  shadowColor?: string;
  shadowPosition?: { x: number; y: number };
  hoverBgColor?: string;
  hoverTextColor?: string;
  route?: string;
  className?: string;
}

const ButtonPop: React.FC<ButtonProps> = ({
  text,
  textColor = "black",
  bgColor = "orange",
  borderColor = "black",
  shadowColor = "black",
  shadowPosition = { x: -8, y: 8 },
  hoverBgColor = "darkorange",
  hoverTextColor = "white",
  route,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={route || "#"} passHref>
      <div
        className={` leading-none absolute flex justify-center items-center p-1 sm:p-2 md:p-2 lg:p-2 xl:p-4 
         right-0 bottom-[-10px] text-white rounded-[2em] sm:rounded-[2em] md:rounded-[2em] lg:rounded-[4em] xl:rounded-[6em]
        max-w-[215px] max-h-[60px] border-4 ${className} cursor-pointer
        transition-colors duration-300 ease-in-out`}
        style={{
          color: isHovered ? hoverTextColor : textColor,
          backgroundColor: isHovered ? hoverBgColor : bgColor,
          borderColor: borderColor,
          boxShadow: `${shadowPosition.x}px ${shadowPosition.y}px 0 0 ${shadowColor}`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className="text-base leading-none text-center sm:text-lg md:text-xl lg:text-xl xl:text-lg tracking-tight font-semibold">
          {text}
        </p>
      </div>
    </Link>
  );
};

export default ButtonPop;
