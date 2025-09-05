import { useForm } from 'react-hook-form';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { QuestionFormData, UseQuestionFormProps, UserAnswer } from '../types';

export function useQuestionForm({
  question,
  initialAnswer,
  onAnswer,
  onNext,
}: UseQuestionFormProps) {
  const [textareaConfig, setTextareaConfig] = useState(question.options.find(opt => opt.textarea?.enabled)?.textarea);

  const questionConfig = useMemo(() => question.config, [question.config]);
  const isSingleSelection = useMemo(() => questionConfig.selectionMode === 'single', [questionConfig.selectionMode]);
  
  const exclusiveOptions = useMemo(() => {
    return question.options.filter(opt => opt.behavior === 'exclusive');
  }, [question.options]);

  const conditionalOptions = useMemo(() => {
    return question.options.filter(opt => opt.behavior === 'conditional');
  }, [question.options]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<QuestionFormData>({
    defaultValues: {
      selectedOptions: initialAnswer?.selectedOptions || [],
      freeText: initialAnswer?.freeText || '',
    },
    mode: 'onChange',
    resolver: (values) => {
      const errors: Record<string, { type: string; message: string }> = {};

      // Validación de opciones exclusivas
      const exclusiveSelected = values.selectedOptions.filter(optId => 
        exclusiveOptions.some(exOpt => exOpt.id === optId)
      );
      
      if (exclusiveSelected.length > 1) {
        errors.selectedOptions = {
          type: 'exclusive',
          message: 'No puedes seleccionar múltiples opciones exclusivas'
        };
      }

      // Validación de textarea requerido
      const hasConditionalWithRequiredTextarea = conditionalOptions.some(opt => 
        values.selectedOptions.includes(opt.id) && opt.textarea?.required && !values.freeText.trim()
      );
      
      if (hasConditionalWithRequiredTextarea) {
        errors.freeText = {
          type: 'required',
          message: 'Debes completar el campo de texto requerido'
        };
      }

      return {
        values,
        errors: Object.keys(errors).length > 0 ? errors : {},
      };
    },
  });

  const selectedOptions = watch('selectedOptions');
  const freeText = watch('freeText');

  useEffect(() => {
    setValue('selectedOptions', initialAnswer?.selectedOptions || []);
    setValue('freeText', initialAnswer?.freeText || '');
    
    const newTextareaConfig = question.options.find(opt => 
      (initialAnswer?.selectedOptions || []).includes(opt.id) && opt.textarea?.enabled
    )?.textarea;
    
    setTextareaConfig(newTextareaConfig);
  }, [question, initialAnswer, setValue]);

  const handleOptionSelect = useCallback((optionId: string) => {
    const option = question.options.find(opt => opt.id === optionId);
    if (!option) return;

    let newSelection: string[];

    // Si la opción ya está seleccionada, la deseleccionamos
    if (selectedOptions.includes(optionId)) {
      newSelection = selectedOptions.filter(id => id !== optionId);
      setValue('selectedOptions', newSelection);
      
      // Limpiar textarea si no quedan opciones condicionales
      if (!newSelection.some(selectedId => 
        question.options.find(opt => opt.id === selectedId)?.behavior === 'conditional'
      )) {
        setTextareaConfig(undefined);
        setValue('freeText', '');
      }
      return;
    }

    // Si es una opción exclusiva
    if (option.behavior === 'exclusive') {
      // Reemplazar toda la selección con solo esta opción
      newSelection = [optionId];
      setValue('selectedOptions', newSelection);
      setValue('freeText', '');
      setTextareaConfig(undefined);
      return;
    }

    // Si es una opción no exclusiva, primero deseleccionar todas las opciones exclusivas
    const nonExclusiveOptions = selectedOptions.filter(selectedId => {
      const selectedOption = question.options.find(opt => opt.id === selectedId);
      return selectedOption?.behavior !== 'exclusive';
    });

    // Para selección única, reemplazar con la nueva opción
    if (isSingleSelection) {
      newSelection = [optionId];
    } else {
      // Para selección múltiple, agregar la nueva opción a las no exclusivas
      newSelection = [...nonExclusiveOptions, optionId];
    }

    setValue('selectedOptions', newSelection);

    // Configurar textarea si es una opción condicional
    if (option.behavior === 'conditional' && option.textarea?.enabled) {
      setTextareaConfig(option.textarea);
    }
  }, [question.options, isSingleSelection, selectedOptions, setValue]);

  const onSubmit = useCallback((data: QuestionFormData) => {
    const userAnswer: UserAnswer = {
      questionId: question.id,
      selectedOptions: data.selectedOptions,
      freeText: data.freeText.trim() || undefined,
      timestamp: new Date(),
    };

    onAnswer(question.id, userAnswer);
    onNext();
  }, [question.id, onAnswer, onNext]);

  const canProceed = useMemo(() => {
    // El botón se habilita si hay opciones seleccionadas O si hay texto en el textarea
    const hasSelections = selectedOptions.length > 0;
    const hasText = freeText && freeText.trim().length > 0;
    
    return hasSelections || hasText;
  }, [selectedOptions.length, freeText]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleOptionSelect,
    selectedOptions,
    freeText,
    textareaConfig,
    canProceed,
    errors,
    isSingleSelection,
  };
}
