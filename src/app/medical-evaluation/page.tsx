'use client';

import { QuestionWizard, Header } from '@/components';
import { questions } from '@/types';
import { useQuestionWizard } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function TestPage() {
  const searchParams = useSearchParams();
  const questionParam = searchParams.get('question');
  
  const wizardState = useQuestionWizard({ 
    questions,
    initialQuestionIndex: questionParam ? parseInt(questionParam) : 0
  });

  return (
    <div className="h-screen bg-white flex flex-col">
      <Header 
        showBackButton 
        onBackClick={wizardState.handleBack}
        showProgressBar
        currentStep={wizardState.progress.currentStep}
        totalSteps={wizardState.progress.totalSteps}
      />
      <div className="flex-1">
        <QuestionWizard 
          currentQuestion={wizardState.currentQuestion}
          progress={wizardState.progress}
          initialAnswer={wizardState.initialAnswer}
          onAnswer={wizardState.handleAnswer}
          onNext={wizardState.handleNext}
        />
      </div>
    </div>
  );
}
