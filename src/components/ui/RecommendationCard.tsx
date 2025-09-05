"use client";

import React from "react";
import Button from "./Button";
import { RecommendationCardProps } from "../../types";

export default function RecommendationCard({
  recommendation,
  onAction,
  className = "",
}: RecommendationCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 ${className}`}
    >
      {recommendation.image && (
        <div>
          <img
            src={recommendation.image}
            alt={recommendation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {recommendation.category}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
            {recommendation.title}
          </h3>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {recommendation.description}
        </p>

        <Button onClick={() => onAction?.(recommendation.id)} variant="primary">
          Ver más detalles
        </Button>
      </div>
    </div>
  );
}
