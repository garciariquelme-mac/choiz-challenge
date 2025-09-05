"use client";

import React from "react";
import { useFaqs } from "../../hooks/useFaqs";
import { useAccordion } from "../../hooks/useAccordion";
import { FaqsAccordionProps } from "../../types";

export default function FaqsAccordion({
  className = "",
  autoFetch = true,
  customFaqs,
}: FaqsAccordionProps) {
  const { toggleItem, isOpen } = useAccordion();

  const { faqs: fetchedFaqs, isLoading, error, refetch } = useFaqs();

  const faqs = customFaqs || fetchedFaqs;

  const faqsWithUniqueIds = faqs.map((faq, index) => ({
    ...faq,
    id: faq.id || `faq-${index}`,
  }));

  if (autoFetch && isLoading) {
    return (
      <div className={`${className}`}>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#9F7CF7]"></div>
            <span className="ml-3 text-gray-600">
              Cargando preguntas frecuentes...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (autoFetch && error) {
    return (
      <div className={`${className}`}>
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <div className="text-center">
            <p className="text-red-600 mb-3">{error}</p>
            <button
              onClick={refetch}
              className="text-white px-4 py-2 rounded-md transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="w-[100%] mx-auto rounded-[24px] px-5 py-4 shadow-[0px_1px_34px_0px_#10182814]">
        {faqsWithUniqueIds.map((faq, index) => (
          <div key={faq.id}>
            <button 
              onClick={() => toggleItem(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none cursor-pointer"
              aria-expanded={isOpen(faq.id)}
              aria-controls={`faq-answer-${faq.id}`}
            >
              <h3 className="text-[16px] font-medium text-[#3B3345] pr-4">
                {faq.question}
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  isOpen(faq.id) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id={`faq-answer-${faq.id}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen(faq.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-4">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>

            {index < faqsWithUniqueIds.length - 1 && (
              <div className="border-t border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
