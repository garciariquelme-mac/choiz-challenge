// Tipos base para comportamiento de respuestas
export type SelectionMode = 'single' | 'multiple';
export type AnswerBehavior = 'exclusive' | 'inclusive' | 'conditional';

// Configuración de textarea
export interface TextareaConfig {
  enabled: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

// Respuesta individual
export interface AnswerOption {
  id: string;
  text: string;
  behavior: AnswerBehavior;
  textarea?: TextareaConfig;
  exclusiveWith?: string[]; // IDs de respuestas que se excluyen mutuamente
}

// Configuración de pregunta
export interface QuestionConfig {
  selectionMode: SelectionMode;
  allowMultiple?: boolean;
}

// Pregunta principal
export interface Question {
  id: string;
  title: string;
  description?: string;
  config: QuestionConfig;
  options: AnswerOption[];
}

// Estado de respuesta del usuario
export interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
  freeText?: string;
  timestamp: Date;
}


