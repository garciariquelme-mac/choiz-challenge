import React from 'react';
import Button from './Button';

export default function NoAnswersState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          No hay respuestas disponibles
        </h1>
        <p className="text-gray-600 mb-6">
          Para ver tus recomendaciones personalizadas, primero debes completar el cuestionario.
        </p>
        <Button 
          onClick={() => window.history.back()}
          variant='primary'
        >
          Volver al cuestionario
        </Button>
      </div>
    </div>
  );
}
