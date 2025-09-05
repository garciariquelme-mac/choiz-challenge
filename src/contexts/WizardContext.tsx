'use client';

import React, { createContext, useContext, useState } from 'react';
import { WizardContextType, WizardProviderProps, UserAnswer } from '../types';

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: WizardProviderProps) {
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});

  const setAnswer = (questionId: string, answer: UserAnswer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const clearAnswers = () => {
    setAnswers({});
  };

  const hasAnswers = Object.keys(answers).length > 0;

  return (
    <WizardContext.Provider value={{
      answers,
      setAnswer,
      clearAnswers,
      hasAnswers,
    }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizardContext() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }
  return context;
}
