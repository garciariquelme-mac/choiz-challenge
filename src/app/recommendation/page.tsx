"use client";

import React from "react";
import { useRecommendationPage } from "../../hooks";
import {
  NoAnswersState,
  RecommendationHeader,
  TreatmentsList,
  AnswersSection,
  FaqsAccordion,
  Header,
} from "../../components";
import { questions } from "../../data/questions";

export default function RecommendationPage() {
  const {
    answers,
    hasAnswers,
    recommendedTreatments,
    showAnswersSection,
    selectedTreatment,
    handleTreatmentSelect,
    handleCloseAnswersSection,
    handleBackToLastQuestion,
  } = useRecommendationPage();

  if (!hasAnswers) {
    return <NoAnswersState />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        showBackButton
        onBackClick={handleBackToLastQuestion}
        showProgressBar
        currentStep={questions.length}
        totalSteps={questions.length}
        isRecommendationStep
        isTreatmentSelected={!!selectedTreatment}
      />
      <div className="container mx-auto px-4 py-4">
        <RecommendationHeader />

        <TreatmentsList
          treatments={recommendedTreatments}
          onTreatmentSelect={handleTreatmentSelect}
        />

        {showAnswersSection && selectedTreatment && (
          <AnswersSection
            answers={answers}
            treatment={selectedTreatment.title}
            onClose={handleCloseAnswersSection}
          />
        )}

        {/* Sección de FAQs */}
        <div className="mt-6">
          <FaqsAccordion />
        </div>
      </div>
    </div>
  );
}
