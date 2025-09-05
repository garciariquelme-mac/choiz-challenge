import { Question } from '../types';

export const questions: Question[] = [
  {
    id: "scalp_problems",
    title: "¿Tienes algún problema en el cuero cabelludo?",
    description: "Selecciona todas las opciones que apliquen.",
    config: {
      selectionMode: 'multiple',
      allowMultiple: true,
    },
    options: [
      {
        id: "scalp_problems_pain",
        text: "Dolor repentino y/o enrojecimiento",
        behavior: 'inclusive',
      },
      {
        id: "scalp_problems_dandruff",
        text: "Caspa",
        behavior: 'inclusive',
      },
      {
        id: "scalp_problems_psoriasis",
        text: "Psoriasis",
        behavior: 'inclusive',
      },
      {
        id: "scalp_problems_sunburn",
        text: "Quemadura de sol",
        behavior: 'inclusive',
      },
      {
        id: "scalp_problems_other",
        text: "Otro",
        behavior: 'conditional',
        textarea: {
          enabled: true,
          label: "Cuéntanos cuál es el problema",
          placeholder: "Inserta tu respuesta aquí",
          required: true,
        },
      },
      {
        id: "scalp_problems_none",
        text: "No, ninguno de los anteriores",
        behavior: 'exclusive',
      },
    ]
  },
  {
    id: "family_history",
    title: "¿Hay antecedentes de caída del cabello en tu familia?",
    config: {
      selectionMode: 'single',
      allowMultiple: false,
    },
    options: [
      {
        id: "family_history_no",
        text: "No",
        behavior: 'exclusive',
      },
      {
        id: "family_history_yes",
        text: "Sí",
        behavior: 'exclusive',
      },
      {
        id: "family_history_unsure",
        text: "No estoy seguro",
        behavior: 'exclusive',
      }
    ]
  },
  {
    id: "medical_conditions",
    title: "¿Tienes o has tenido alguna de las siguientes condiciones médicas?",
    description: "Selecciona todas las opciones que apliquen.",
    config: {
      selectionMode: 'multiple',
      allowMultiple: true,
    },
    options: [
      {
        id: "medical_breast_cancer",
        text: "Cáncer de mama",
        behavior: 'inclusive',
      },
      {
        id: "medical_prostate_cancer",
        text: "Cáncer de próstata",
        behavior: 'inclusive',
      },
      {
        id: "medical_low_blood_pressure",
        text: "Presión arterial baja incontrolada",
        behavior: 'inclusive',
      },
      {
        id: "medical_autoimmune",
        text: "Otras enfermedades autoinmunes o reumáticas",
        behavior: 'inclusive',
      },
      {
        id: "medical_thyroid",
        text: "Problemas de tiroides",
        behavior: 'inclusive',
      },
      {
        id: "medical_heart",
        text: "Enfermedades del corazón",
        behavior: 'inclusive',
      },
      {
        id: "medical_kidney_liver",
        text: "Enfermedades de riñón o hígado",
        behavior: 'inclusive',
      },
      {
        id: "medical_none",
        text: "No, ninguna de las anteriores",
        behavior: 'exclusive',
      },
    ]
  },
  {
    id: "mental_health_conditions",
    title: "¿Tienes o has tenido alguna de estas condiciones de salud mental?",
    description: "Selecciona todas las opciones que apliquen.",
    config: {
      selectionMode: 'multiple',
      allowMultiple: true,
    },
    options: [
      {
        id: "mental_depression",
        text: "Depresión",
        behavior: 'inclusive',
      },
      {
        id: "mental_bipolarity",
        text: "Desorden de bipolaridad",
        behavior: 'inclusive',
      },
      {
        id: "mental_anxiety",
        text: "Ansiedad",
        behavior: 'inclusive',
      },
      {
        id: "mental_panic_attacks",
        text: "Ataques de pánico",
        behavior: 'inclusive',
      },
      {
        id: "mental_post_traumatic_stress_disorder",
        text: "Desorden de estrés post-traumático",
        behavior: 'inclusive',
      },
      {
        id: "mental_schizophrenia",
        text: "Esquizofrenia",
        behavior: 'inclusive',
      },
      {
        id: "mental_none",
        text: "No, ninguna de las anteriores",
        behavior: 'exclusive',
      },
    ]
  }
];
