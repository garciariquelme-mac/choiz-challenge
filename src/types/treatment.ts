export interface Treatment {
  id: string;
  title: string;
  composition: string;
  image: string;
  category: 'no_medical_conditions' | 'has_medical_conditions' | 'cancer_conditions';
}
