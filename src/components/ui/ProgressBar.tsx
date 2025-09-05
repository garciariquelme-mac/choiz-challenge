"use client";

import React from "react";
import { ProgressBarProps } from "../../types";

export default function ProgressBar({
  currentStep,
  totalSteps,
  isRecommendationStep = false,
  isTreatmentSelected = false,
  className = "",
}: ProgressBarProps) {
  let progress: number;

  if (isTreatmentSelected) {
    progress = 100;
  } else if (isRecommendationStep) {
    progress = 90;
  } else {
    if (currentStep === totalSteps) {
      progress = 85;
    } else {
      progress = (currentStep / totalSteps) * 100;
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-[#D3D3D3] rounded-full h-1">
        <div
          className="bg-[#6042AA] h-1 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
