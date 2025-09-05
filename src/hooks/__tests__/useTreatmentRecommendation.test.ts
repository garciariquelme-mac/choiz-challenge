import { renderHook } from '@testing-library/react';
import { useTreatmentRecommendation } from '../useTreatmentRecommendation';
import { UserAnswer } from '../../types/question';

describe('useTreatmentRecommendation', () => {
  describe('Caso de uso 1: Usuario no tiene ninguna condición médica', () => {
    it('debería retornar "no_medical_conditions" cuando el usuario selecciona "medical_none"', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_none'],
          freeText: '',
          timestamp: new Date()
        }
      };

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('no_medical_conditions');
      expect(result.current.hasMedicalConditions).toBe(false);
      expect(result.current.hasCancerConditions).toBe(false);
    });

    it('debería retornar "no_medical_conditions" cuando no hay respuesta para medical_conditions', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {};

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('no_medical_conditions');
      expect(result.current.hasMedicalConditions).toBe(false);
      expect(result.current.hasCancerConditions).toBe(false);
    });

    it('debería retornar "no_medical_conditions" cuando medical_conditions es undefined', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: undefined as any
      };

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('no_medical_conditions');
      expect(result.current.hasMedicalConditions).toBe(false);
      expect(result.current.hasCancerConditions).toBe(false);
    });
  });

  describe('Caso de uso 2: Usuario tiene condiciones médicas generales', () => {
    it('debería retornar "has_medical_conditions" cuando tiene problemas de tiroides', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_thyroid'],
          freeText: '',
          timestamp: new Date()
        }
      };

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('has_medical_conditions');
      expect(result.current.hasMedicalConditions).toBe(true);
      expect(result.current.hasCancerConditions).toBe(false);
    });

    it('debería retornar "has_medical_conditions" cuando tiene enfermedades del corazón', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_heart_disease'],
          freeText: '',
          timestamp: new Date()
        }
      };

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('has_medical_conditions');
      expect(result.current.hasMedicalConditions).toBe(true);
      expect(result.current.hasCancerConditions).toBe(false);
    });

    it('debería retornar "has_medical_conditions" cuando tiene múltiples condiciones médicas generales', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_thyroid', 'medical_heart_disease', 'medical_diabetes'],
          freeText: '',
          timestamp: new Date()
        }
      };

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('has_medical_conditions');
      expect(result.current.hasMedicalConditions).toBe(true);
      expect(result.current.hasCancerConditions).toBe(false);
    });
  });

  describe('Caso de uso 3: Usuario tiene cáncer de mama o próstata', () => {
    it('debería retornar "cancer_conditions" cuando tiene cáncer de mama', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_breast_cancer'],
          freeText: '',
          timestamp: new Date()
        }
      };

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('cancer_conditions');
      expect(result.current.hasMedicalConditions).toBe(true);
      expect(result.current.hasCancerConditions).toBe(true);
    });

    it('debería retornar "cancer_conditions" cuando tiene cáncer de próstata', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_prostate_cancer'],
          freeText: '',
          timestamp: new Date()
        }
      };

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('cancer_conditions');
      expect(result.current.hasMedicalConditions).toBe(true);
      expect(result.current.hasCancerConditions).toBe(true);
    });

    it('debería retornar "cancer_conditions" cuando tiene cáncer junto con otras condiciones médicas', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_breast_cancer', 'medical_thyroid', 'medical_heart_disease'],
          freeText: '',
          timestamp: new Date()
        }
      };

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('cancer_conditions');
      expect(result.current.hasMedicalConditions).toBe(true);
      expect(result.current.hasCancerConditions).toBe(true);
    });

    it('debería retornar "cancer_conditions" cuando tiene ambos tipos de cáncer', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_breast_cancer', 'medical_prostate_cancer'],
          freeText: '',
          timestamp: new Date()
        }
      };

      const { result } = renderHook(() => useTreatmentRecommendation({ answers: mockAnswers }));

      expect(result.current.treatmentCategory).toBe('cancer_conditions');
      expect(result.current.hasMedicalConditions).toBe(true);
      expect(result.current.hasCancerConditions).toBe(true);
    });
  });
});
