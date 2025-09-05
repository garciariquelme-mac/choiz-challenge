// Tipos relacionados con componentes de UI

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  isRecommendationStep?: boolean;
  isTreatmentSelected?: boolean;
  className?: string;
}

export interface TreatmentCardProps {
  treatment: import('./treatment').Treatment;
  className?: string;
  onSelect?: (treatment: import('./treatment').Treatment) => void;
}

export interface TreatmentsListProps {
  treatments: import('./treatment').Treatment[];
  onTreatmentSelect: (treatment: import('./treatment').Treatment) => void;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  rating?: number;
  tags?: string[];
  actionUrl?: string;
}

export interface RecommendationCardProps {
  recommendation: Recommendation;
  onAction?: (recommendationId: string) => void;
  className?: string;
}

export interface AnswersSectionProps {
  answers: Record<string, import('./question').UserAnswer>;
  treatment: string;
  onClose: () => void;
}

export interface BottomSheetStepsProps {
  steps: import('./step').Step[];
  className?: string;
}

export interface ModalBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export interface NoAnswersStateProps {
  onStart?: () => void;
  className?: string;
}

export interface RecommendationHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface UseAccordionReturn {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  isOpen: (id: string) => boolean;
  openItem: (id: string) => void;
  closeItem: (id: string) => void;
  closeAll: () => void;
}
