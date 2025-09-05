"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import BottomSheetSteps from "./BottomSheetSteps";
import { steps } from "../../types";

export default function ModalBottomSheet() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/medical-evaluation");
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50">
      <div className="flex justify-center pb-3">
        <div className="w-10 h-1 bg-white/40 rounded-full" />
      </div>

      <div className="bg-white rounded-t-[24px] md:rounded-none px-6 md:mx-[30%] pt-8 pb-8 shadow-2xl md:shadow-none h-[407px] md:h-[50vh] md:max-h-[50vh]">
        <div className="mb-6">
          <h1 className="text-[#6042AA] pb-2 font-bold text-[26px]">
            Bienvenido a Choiz
          </h1>
          <p className="text-[#424B54] text-[16px]">
            Comienza tu tratamiento en tres pasos:
          </p>
        </div>

        <BottomSheetSteps steps={steps} className="mb-6" />

        <Button onClick={handleContinue} variant="primary">
          Continuar
        </Button>
      </div>
    </div>
  );
}
