"use client";

import { ThemeContext } from "@/app/context/ThemeContext";
import Image from "next/image";
import React, { useContext } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      onClick={handleToggle}
      className="relative w-9 h-4 md:w-10 md:h-5 lg:w-10 lg:h-5 rounded-full cursor-pointer flex items-center justify-between px-1 bg-gray-800 dark:bg-white transition-colors duration-300"
    >
      <Image src="/moon.png" alt="moon" width={12} height={12} />
      
      <div
        className={`absolute w-[15px] h-[15px] rounded-full bg-white shadow-md transition-all dark:bg-black duration-300 ${
          theme === "light" ? "right-[2px]" : "left-[2px]" 
        }`}
      />

      <Image src="/sun.png" alt="sun" width={12} height={12} />
    </div>
  );
};

export default ThemeToggle;