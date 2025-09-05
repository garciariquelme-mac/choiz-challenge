import { useMemo } from 'react';
import { UseTreatmentRecommendationProps } from '../types';

export function useTreatmentRecommendation({ answers }: UseTreatmentRecommendationProps) {
  const treatmentCategory = useMemo(() => {
    const medicalConditionsAnswer = answers['medical_conditions'];
    
    if (!medicalConditionsAnswer) {
      return 'no_medical_conditions'; // Default si no hay respuesta
    }

    const selectedOptions = medicalConditionsAnswer.selectedOptions;
    
    // Lógica de categorización basada en la pregunta 3 del wizard:
    // Caso 1: Si no tiene ninguna condición médica (seleccionó "medical_none")
    const hasNoConditions = selectedOptions.includes('medical_none');
    if (hasNoConditions) {
      return 'no_medical_conditions';
    }
    
    // Caso 3: Entre las condiciones médicas tiene Cáncer de mama o Cáncer de próstata
    // (Prioridad alta: si tiene cáncer, se categoriza como cancer_conditions)
    const hasCancer = selectedOptions.some(optionId => 
      optionId === 'medical_breast_cancer' || optionId === 'medical_prostate_cancer'
    );
    if (hasCancer) {
      return 'cancer_conditions';
    }
    
    // Caso 2: Tiene alguna condición médica (cualquier otra condición médica)
    // (Problemas de tiroides, enfermedades del corazón, etc.)
    return 'has_medical_conditions';
  }, [answers]);

  return {
    treatmentCategory,
    hasMedicalConditions: treatmentCategory !== 'no_medical_conditions',
    hasCancerConditions: treatmentCategory === 'cancer_conditions',
  };
}
