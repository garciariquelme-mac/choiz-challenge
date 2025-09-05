import { Treatment } from '../types';

export const treatments: Treatment[] = [
  // Caso 1: No tiene ninguna condición médica
  {
    id: 'treatment_healthy',
    title: 'DUTAXIDIL® Cápsulas',
    composition: 'Dutasterida 0.5 mg + Minoxidil 2.5 mg + Biotina 2.5 mg',
    image: '/images/hair-blends.png',
    category: 'no_medical_conditions',
  },

  // Caso 2: Tiene alguna condición médica
  {
    id: 'treatment_medical_condition',
    title: 'DUTAXIDIL® Gel',
    composition: 'Dutasterida 0.1% + Minoxidil 5 % + Tretinoína 1% + Hidrocortisona 1%',
    image: '/images/hair-gel.png',
    category: 'has_medical_conditions',
  },

  // Caso 3: Tiene cáncer de mama o de próstata
  {
    id: 'treatment_cancer_safe',
    title: 'Minoxidil® Cápsulas',
    composition: 'Minoxidil 2.5 mg + Biotina 2.5 mg',
    image: '/images/hair-blends.png',
    category: 'cancer_conditions',
  }
];
