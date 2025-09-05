"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeaderProps } from "../../types";
import ProgressBar from "../ui/ProgressBar";

export default function Header({
  showBackButton = false,
  onBackClick,
  showLogo = true,
  className = "",
  showProgressBar = false,
  currentStep = 1,
  totalSteps = 1,
  isRecommendationStep = false,
  isTreatmentSelected = false,
}: HeaderProps) {
  return (
    <header className={`w-full bg-white ${className}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
              >
                <div className="relative w-[15px] h-[12px]">
                  <Image
                    src="/images/arrow-back.png"
                    alt="Back"
                    fill
                    sizes="20px"
                  />
                </div>
              </button>
            )}
          </div>

          <div className="flex-1 flex justify-center">
            {showLogo && (
              <Link href="/">
                <div className="relative w-18 h-6">
                  <Image
                    src="/images/choiz-logo.png"
                    alt="Choiz"
                    fill
                    sizes="112px"
                    priority
                  />
                </div>
              </Link>
            )}
          </div>
          {/* Right side - WhatsApp */}
          <div className="flex items-center">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="relative w-[20px] h-[18px]">
                <Image
                  src="/images/whatsapp-icon.png"
                  alt="WhatsApp"
                  fill
                  sizes="20px"
                />
              </div>
            </a>
          </div>
        </div>

        {showProgressBar && (
          <div className="mt-5">
            <ProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              isRecommendationStep={isRecommendationStep}
              isTreatmentSelected={isTreatmentSelected}
            />
          </div>
        )}
      </div>
    </header>
  );
}
