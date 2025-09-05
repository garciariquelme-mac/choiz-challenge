import React from 'react';
import { AnswersSectionProps } from '../../types';
import { questions } from '../../data/questions';

export default function AnswersSection({ answers }: AnswersSectionProps) {
 
  const getSelectedOptionsText = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    const answer = answers[questionId];
    
    if (!question || !answer) return 'No respondida';
    
    const selectedOptions = answer.selectedOptions.map(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      return option?.text || optionId;
    });
    
    return selectedOptions.join(', ');
  };

  const getAnswerText = (questionId: string) => {
    const answer = answers[questionId];
    if (!answer) return 'No respondida';
    
    let text = getSelectedOptionsText(questionId);
    
    if (answer.freeText) {
      text += ` - ${answer.freeText}`;
    }
    
    return text;
  };

  return (
    <div className="w-full rounded-[24px] shadow-[0px_1px_34px_0px_#10182814] p-6 mb-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 border-1 border-[#6042AA] rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-[#6042AA]">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 mb-1">
                  {question.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {getAnswerText(question.id)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
