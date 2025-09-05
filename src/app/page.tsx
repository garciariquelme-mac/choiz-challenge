import React from "react";
import Image from "next/image";
import { ModalBottomSheet } from "@/components";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="w-[100vw] max-h-[30vh] h-[30vh] scale-[3.3] md:w-full md:h-screen md:min-h-[50vh] md:scale-100">
        <Image 
          src="/images/home-bg.jpg"  
          alt="Home background" 
          width={1920}
          height={1080}
          className="w-full h-full object-contain object-bottom md:object-cover md:object-center"
        />
      </div>

      <div className="absolute top-[30px] left-[30px] z-10">
        <Image
          src="/images/choiz-white-logo.png"
          alt="Choiz"
          width={140}
          height={36}
          priority
          className="max-w-[70px] "
        />
      </div>
      <ModalBottomSheet />
    </div>
  );
}
