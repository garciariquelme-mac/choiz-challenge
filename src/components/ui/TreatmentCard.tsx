import React from "react";
import { TreatmentCardProps } from "../../types";
import Image from "next/image";
import Button from "./Button";

export default function TreatmentCard({
  treatment,
  onSelect,
}: TreatmentCardProps) {
  return (
    <div className="w-full rounded-[24px] shadow-[0px_1px_34px_0px_#10182814]">
      <div className="p-6 w-full">
        <h3 className="text-xl font-semibold text-[#3B3345] mb-3">
          {treatment.title}
        </h3>

        <div className="mb-4">
          <p className="text-sm text-[#7D7D7D] leading-relaxed">
            {treatment.composition}
          </p>
        </div>

        <Image
          src={treatment.image}
          alt={treatment.title}
          className="object-contain mx-auto pb-4"
          width={145.61}
          height={185.58}
          priority={false}
        />

        <Button onClick={() => onSelect?.(treatment)} variant="primary">
          Seleccionar
        </Button>
      </div>
    </div>
  );
}
