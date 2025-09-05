'use client';

import React from 'react';
import Button from '../ui/Button';
import { QuestionFormProps } from '../../types';
import { useQuestionForm } from '../../hooks/useQuestionForm';

export default function QuestionForm({
  question,
  onAnswer,
  onNext,
  className = '',
  initialAnswer,
}: QuestionFormProps) {
  const {
    register,
    handleSubmit,
    handleOptionSelect,
    selectedOptions,
    textareaConfig,
    canProceed,
    errors,
  } = useQuestionForm({
    question,
    initialAnswer,
    onAnswer,
    onNext,
  });

  return (
    <div className={`max-w-2xl mx-auto h-full flex flex-col ${className}`}>
      <div className="flex-1 flex flex-col">
        <div className="mb-8">
          <h2 className="text-[20px] font-semibold text-[#3B3345] mb-2">
            {question.title}
          </h2>
          {question.description && (
            <p className="text-[#666768] text-[14px] leading-relaxed">
              {question.description}
            </p>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full p-4 text-left rounded-lg border-1 transition-all ${
                selectedOptions.includes(option.id)
                  ? 'border-black'
                  : 'border-gray-200 hover:border-[#E0E0E0]'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-1 mr-3 flex items-center justify-center ${
                  selectedOptions.includes(option.id)
                    ? 'border-black'
                    : 'border-[#E0E0E0]'
                }`}>
                  {selectedOptions.includes(option.id) && (
                    <svg
                      className="w-3 h-3 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-800">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        {errors.selectedOptions && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{errors.selectedOptions.message}</p>
          </div>
        )}

        {textareaConfig && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {textareaConfig.label || 'Información adicional'}
            </label>
            <textarea
              {...register('freeText')}
              placeholder={textareaConfig.placeholder}
              className="w-full text-[#424B54] placeholder:text-[#B2B2B2] p-4 border-2 border-gray-200 rounded-lg resize-none focus:border-[#292929] focus:outline-none"
              rows={4}
            />
            {errors.freeText && (
              <p className="text-red-500 text-sm mt-1">{errors.freeText.message}</p>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex justify-end items-center mt-auto pt-6">
        <Button
          type="submit"
          disabled={!canProceed}
          variant='primary'
        >
          Continuar
        </Button>
      </form>
    </div>
  );
}
