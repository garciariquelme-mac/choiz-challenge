// Tipos relacionados con formularios y hooks de formularios

import { Question, UserAnswer } from './question';

export interface QuestionFormData {
  selectedOptions: string[];
  freeText: string;
}

export interface UseQuestionFormProps {
  question: Question;
  initialAnswer?: UserAnswer;
  onAnswer: (questionId: string, answer: UserAnswer) => void;
  onNext: () => void;
}

export interface QuestionFormProps {
  question: Question;
  onAnswer: (questionId: string, answer: UserAnswer) => void;
  onNext: () => void;
  className?: string;
  initialAnswer?: UserAnswer;
}

export interface QuestionWizardProps {
  currentQuestion: Question;
  progress: {
    currentStep: number;
    totalSteps: number;
    percentage: number;
  };
  initialAnswer: UserAnswer;
  onAnswer: (questionId: string, answer: UserAnswer) => void;
  onNext: () => void;
  className?: string;
}
