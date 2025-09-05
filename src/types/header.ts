export interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  showLogo?: boolean;
  className?: string;
  showProgressBar?: boolean;
  currentStep?: number;
  totalSteps?: number;
  isRecommendationStep?: boolean;
  isTreatmentSelected?: boolean;
}
