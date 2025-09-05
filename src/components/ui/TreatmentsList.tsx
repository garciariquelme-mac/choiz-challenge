import React from 'react';
import { TreatmentsListProps } from '../../types';
import TreatmentCard from './TreatmentCard';

export default function TreatmentsList({ treatments, onTreatmentSelect }: TreatmentsListProps) {
  if (treatments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          No hay tratamientos disponibles para tu perfil actual.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-md mx-auto mb-8 md:justify-center">
      {treatments.map((treatment) => (
        <TreatmentCard
          key={treatment.id}
          treatment={treatment}
          className="w-full"
          onSelect={onTreatmentSelect}
        />
      ))}
    </div>
  );
}
