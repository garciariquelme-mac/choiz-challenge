'use client';

import React from 'react';
import { QuestionWizardProps } from '../../types';
import QuestionForm from './QuestionForm';

export default function QuestionWizard({
  currentQuestion,
  initialAnswer,
  onAnswer,
  onNext,
}: QuestionWizardProps) {
  if (!currentQuestion) return null;

  return (
    <div className="h-full pb-10">
      <div className="container mx-auto px-4 py-2 h-full">
        <div className="max-w-3xl mx-auto h-full">
          <QuestionForm
            question={currentQuestion}
            onAnswer={onAnswer}
            onNext={onNext}
            initialAnswer={initialAnswer}
          />
        </div>
      </div>
    </div>
  );
}
