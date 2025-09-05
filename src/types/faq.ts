// Tipos relacionados con preguntas frecuentes (FAQs)

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface UseFaqsReturn {
  faqs: FAQ[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface FaqsAccordionProps {
  className?: string;
  autoFetch?: boolean;
  customFaqs?: FAQ[];
}
