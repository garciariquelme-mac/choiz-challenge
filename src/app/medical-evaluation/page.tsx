'use client';

import { QuestionWizard, Header } from '@/components';
import { questions } from '@/types';
import { useQuestionWizard } from '@/hooks';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function MedicalEvaluationContent() {
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

export default function TestPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-white flex items-center justify-center">Cargando...</div>}>
      <MedicalEvaluationContent />
    </Suspense>
  );
}
