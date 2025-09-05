import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UseQuestionWizardProps, UserAnswer } from '../types';
import { useWizardContext } from '../contexts/WizardContext';

export function useQuestionWizard({ 
  questions, 
  onComplete, 
  redirectToRecommendation = true,
  initialQuestionIndex = 0 
}: UseQuestionWizardProps) {
  const router = useRouter();
  const { answers, setAnswer } = useWizardContext();
  const [currentIndex, setCurrentIndex] = useState(initialQuestionIndex);

  const totalSteps = questions.length;
  const currentQuestion = questions[currentIndex];

  const initialAnswer = useMemo(() => {
    return answers[currentQuestion?.id];
  }, [answers, currentQuestion]);

  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === totalSteps - 1;
  const canGoBack = !isFirstStep;
  const canGoNext = currentQuestion && answers[currentQuestion.id];

  const handleAnswer = useCallback((questionId: string, answer: UserAnswer) => {
    setAnswer(questionId, answer);
  }, [setAnswer]);

  const handleNext = useCallback(() => {
    if (!isLastStep) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete?.(answers);
      if (redirectToRecommendation) {
        router.push('/recommendation');
      }
    }
  }, [currentIndex, isLastStep, onComplete, answers, redirectToRecommendation, router]);

  const handleBack = useCallback(() => {
    if (isFirstStep) {
      // Si es la primera pregunta, redirige a la página de inicio
      router.push('/');
    } else {
      // Si no es la primera pregunta, va a la pregunta anterior
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, isFirstStep, router]);

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setCurrentIndex(stepIndex);
    }
  }, [totalSteps]);

  const resetWizard = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const getProgress = useMemo(() => {
    return {
      currentStep: currentIndex + 1,
      totalSteps,
      percentage: ((currentIndex + 1) / totalSteps) * 100,
    };
  }, [currentIndex, totalSteps]);

  return {
    // Estado actual
    currentQuestion,
    currentIndex,
    initialAnswer,
    answers,
    
    // Información del progreso
    totalSteps,
    progress: getProgress,
    
    // Estados booleanos
    isFirstStep,
    isLastStep,
    canGoBack,
    canGoNext,
    
    // Acciones
    handleAnswer,
    handleNext,
    handleBack,
    goToStep,
    resetWizard,
  };
}
