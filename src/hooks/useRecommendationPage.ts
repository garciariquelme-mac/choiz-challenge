import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { treatments } from '../data/treatments';
import { useTreatmentRecommendation } from './useTreatmentRecommendation';
import { useWizardContext } from '../contexts/WizardContext';
import { Treatment } from '../types';
import { questions } from '../data/questions';

export function useRecommendationPage() {
  const router = useRouter();
  const { answers, hasAnswers } = useWizardContext();
  const { treatmentCategory } = useTreatmentRecommendation({ answers });
  const [showAnswersSection, setShowAnswersSection] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const recommendedTreatments = treatments.filter(
    treatment => treatment.category === treatmentCategory
  );

  const handleTreatmentSelect = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setShowAnswersSection(true);
  };

  const handleCloseAnswersSection = () => {
    setShowAnswersSection(false);
  };

  const handleBackToLastQuestion = () => {
    const lastQuestionIndex = questions.length - 1;
    router.push(`/medical-evaluation?question=${lastQuestionIndex}`);
  };

  return {
    // Estado
    answers,
    hasAnswers,
    treatmentCategory,
    recommendedTreatments,
    showAnswersSection,
    selectedTreatment,
    
    // Acciones
    handleTreatmentSelect,
    handleCloseAnswersSection,
    handleBackToLastQuestion,
  };
}
