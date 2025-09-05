import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useRecommendationPage } from '../useRecommendationPage';
import { useWizardContext } from '../../contexts/WizardContext';
import { useTreatmentRecommendation } from '../useTreatmentRecommendation';
import { UserAnswer } from '../../types/question';
import { Treatment } from '../../types/treatment';

// Mock de las dependencias
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../contexts/WizardContext', () => ({
  useWizardContext: jest.fn(),
}));

jest.mock('../useTreatmentRecommendation', () => ({
  useTreatmentRecommendation: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseWizardContext = useWizardContext as jest.MockedFunction<typeof useWizardContext>;
const mockUseTreatmentRecommendation = useTreatmentRecommendation as jest.MockedFunction<typeof useTreatmentRecommendation>;

describe('useRecommendationPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as any);
  });

  describe('Estado inicial', () => {
    it('debería inicializar con el estado correcto', () => {
    
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_none'],
          freeText: '',
          timestamp: new Date()
        }
      };

      mockUseWizardContext.mockReturnValue({
        answers: mockAnswers,
        hasAnswers: true,
        setAnswer: jest.fn(),
        clearAnswers: jest.fn(),
      });

      mockUseTreatmentRecommendation.mockReturnValue({
        treatmentCategory: 'no_medical_conditions',
        hasMedicalConditions: false,
        hasCancerConditions: false,
      });

     
      const { result } = renderHook(() => useRecommendationPage());

      expect(result.current.answers).toEqual(mockAnswers);
      expect(result.current.hasAnswers).toBe(true);
      expect(result.current.treatmentCategory).toBe('no_medical_conditions');
      expect(result.current.showAnswersSection).toBe(false);
      expect(result.current.selectedTreatment).toBe(null);
      expect(result.current.recommendedTreatments).toHaveLength(1);
      expect(result.current.recommendedTreatments[0].category).toBe('no_medical_conditions');
    });

    it('debería filtrar los tratamientos según la categoría de tratamiento', () => {

      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_breast_cancer'],
          freeText: '',
          timestamp: new Date()
        }
      };

      mockUseWizardContext.mockReturnValue({
        answers: mockAnswers,
        hasAnswers: true,
        setAnswer: jest.fn(),
        clearAnswers: jest.fn(),
      });

      mockUseTreatmentRecommendation.mockReturnValue({
        treatmentCategory: 'cancer_conditions',
        hasMedicalConditions: true,
        hasCancerConditions: true,
      });

      const { result } = renderHook(() => useRecommendationPage());

      expect(result.current.treatmentCategory).toBe('cancer_conditions');
      expect(result.current.recommendedTreatments).toHaveLength(1);
      expect(result.current.recommendedTreatments[0].category).toBe('cancer_conditions');
      expect(result.current.recommendedTreatments[0].id).toBe('treatment_cancer_safe');
    });
  });

  describe('Selección de tratamiento', () => {
    it('debería manejar la selección de un tratamiento correctamente', () => {

      const mockAnswers: Record<string, UserAnswer> = {};
      const mockTreatment: Treatment = {
        id: 'treatment_healthy',
        title: 'DUTAXIDIL® Cápsulas',
        composition: 'Dutasterida 0.5 mg + Minoxidil 2.5 mg + Biotina 2.5 mg',
        image: '/images/hair-blends.png',
        category: 'no_medical_conditions',
      };

      mockUseWizardContext.mockReturnValue({
        answers: mockAnswers,
        hasAnswers: false,
        setAnswer: jest.fn(),
        clearAnswers: jest.fn(),
      });

      mockUseTreatmentRecommendation.mockReturnValue({
        treatmentCategory: 'no_medical_conditions',
        hasMedicalConditions: false,
        hasCancerConditions: false,
      });

      const { result } = renderHook(() => useRecommendationPage());

      act(() => {
        result.current.handleTreatmentSelect(mockTreatment);
      });

      expect(result.current.selectedTreatment).toEqual(mockTreatment);
      expect(result.current.showAnswersSection).toBe(true);
    });

    it('debería cerrar la sección de respuestas correctamente', () => {

      const mockAnswers: Record<string, UserAnswer> = {};
      const mockTreatment: Treatment = {
        id: 'treatment_healthy',
        title: 'DUTAXIDIL® Cápsulas',
        composition: 'Dutasterida 0.5 mg + Minoxidil 2.5 mg + Biotina 2.5 mg',
        image: '/images/hair-blends.png',
        category: 'no_medical_conditions',
      };

      mockUseWizardContext.mockReturnValue({
        answers: mockAnswers,
        hasAnswers: false,
        setAnswer: jest.fn(),
        clearAnswers: jest.fn(),
      });

      mockUseTreatmentRecommendation.mockReturnValue({
        treatmentCategory: 'no_medical_conditions',
        hasMedicalConditions: false,
        hasCancerConditions: false,
      });

      const { result } = renderHook(() => useRecommendationPage());

      act(() => {
        result.current.handleTreatmentSelect(mockTreatment);
      });

      act(() => {
        result.current.handleCloseAnswersSection();
      });

      expect(result.current.showAnswersSection).toBe(false);
      expect(result.current.selectedTreatment).toEqual(mockTreatment);
    });
  });

  describe('Navegación', () => {
    it('debería navegar a la última pregunta cuando se presiona "Volver"', () => {

      const mockAnswers: Record<string, UserAnswer> = {};

      mockUseWizardContext.mockReturnValue({
        answers: mockAnswers,
        hasAnswers: false,
        setAnswer: jest.fn(),
        clearAnswers: jest.fn(),
      });

      mockUseTreatmentRecommendation.mockReturnValue({
        treatmentCategory: 'no_medical_conditions',
        hasMedicalConditions: false,
        hasCancerConditions: false,
      });

      const { result } = renderHook(() => useRecommendationPage());

      act(() => {
        result.current.handleBackToLastQuestion();
      });

      expect(mockPush).toHaveBeenCalledWith('/medical-evaluation?question=3'); 
    });
  });

  describe('Diferentes categorías de tratamiento', () => {
    it('debería mostrar tratamientos para condiciones médicas generales', () => {
      
      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_thyroid'],
          freeText: '',
          timestamp: new Date()
        }
      };

      mockUseWizardContext.mockReturnValue({
        answers: mockAnswers,
        hasAnswers: true,
        setAnswer: jest.fn(),
        clearAnswers: jest.fn(),
      });

      mockUseTreatmentRecommendation.mockReturnValue({
        treatmentCategory: 'has_medical_conditions',
        hasMedicalConditions: true,
        hasCancerConditions: false,
      });

      const { result } = renderHook(() => useRecommendationPage());

      expect(result.current.treatmentCategory).toBe('has_medical_conditions');
      expect(result.current.recommendedTreatments).toHaveLength(1);
      expect(result.current.recommendedTreatments[0].category).toBe('has_medical_conditions');
      expect(result.current.recommendedTreatments[0].id).toBe('treatment_medical_condition');
    });

    it('debería mostrar tratamientos para condiciones de cáncer', () => {

      const mockAnswers: Record<string, UserAnswer> = {
        medical_conditions: {
          questionId: 'medical_conditions',
          selectedOptions: ['medical_prostate_cancer'],
          freeText: '',
          timestamp: new Date()
        }
      };

      mockUseWizardContext.mockReturnValue({
        answers: mockAnswers,
        hasAnswers: true,
        setAnswer: jest.fn(),
        clearAnswers: jest.fn(),
      });

      mockUseTreatmentRecommendation.mockReturnValue({
        treatmentCategory: 'cancer_conditions',
        hasMedicalConditions: true,
        hasCancerConditions: true,
      });

      const { result } = renderHook(() => useRecommendationPage());

      expect(result.current.treatmentCategory).toBe('cancer_conditions');
      expect(result.current.recommendedTreatments).toHaveLength(1);
      expect(result.current.recommendedTreatments[0].category).toBe('cancer_conditions');
      expect(result.current.recommendedTreatments[0].id).toBe('treatment_cancer_safe');
    });
  });
});
