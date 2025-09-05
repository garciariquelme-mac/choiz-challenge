import React from "react";
import { BottomSheetStepsProps } from "../../types";
import Image from "next/image";

export default function BottomSheetSteps({
  steps,
  className = "",
}: BottomSheetStepsProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-[6.5px] top-2 bottom-8 w-px h-[70px] bg-[#E0E0E0]"></div>
      <div>
        {steps?.map((step, index) => (
          <div key={index} className="flex items-center gap-4 relative pb-1">
            <span
              className={`w-[14px] h-[14px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10
              border border-[#E0E0E0] ${
                index === 0 ? "bg-[#F9F9F9]" : "bg-white"
              }`}
            ></span>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[#666768] text-[14px]">{step.text}</h3>
                {step.detail && (
                  <span className="text-[#9F7CF7] text-sm flex items-center space-x-2 gap-2">
                    {step.icon && (
                      <Image
                        src={`/${step.icon}`}
                        alt={step.text}
                        width={16}
                        height={16}
                      />
                    )}
                    {step.detail}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
