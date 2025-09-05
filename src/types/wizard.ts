// Tipos relacionados con el wizard y context

import { UserAnswer } from './question';
import { ReactNode } from 'react';

export interface WizardContextType {
  answers: Record<string, UserAnswer>;
  setAnswer: (questionId: string, answer: UserAnswer) => void;
  clearAnswers: () => void;
  hasAnswers: boolean;
}

export interface WizardProviderProps {
  children: ReactNode;
}

export interface UseQuestionWizardProps {
  questions: import('./question').Question[];
  onComplete?: (answers: Record<string, UserAnswer>) => void;
  redirectToRecommendation?: boolean;
  initialQuestionIndex?: number;
}

export interface UseTreatmentRecommendationProps {
  answers: Record<string, UserAnswer>;
}
