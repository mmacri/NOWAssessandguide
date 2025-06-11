import React, { useState } from 'react';
import { Button } from '../Common/Button';
import { useAssessment } from '../../context/AssessmentContext';
import { MultipleChoiceQuestion } from './QuestionTypes/MultipleChoiceQuestion';
import { ScaleQuestion } from './QuestionTypes/ScaleQuestion';
import { OpenEndedQuestion } from './QuestionTypes/OpenEndedQuestion';
import { questions } from '../../data/questions';
import { calculateRecommendations } from '../../utils/recommendationEngine';
interface QuestionnaireContainerProps {
  onContinue: () => void;
}
export const QuestionnaireContainer = ({
  onContinue
}: QuestionnaireContainerProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const {
    answers,
    addAnswer,
    setRecommendedModules
  } = useAssessment();
  const currentQuestion = questions[currentQuestionIndex];
  const progress = Math.round((currentQuestionIndex + 1) / questions.length * 100);
  const handleAnswer = (questionId: string, value: string | number | string[]) => {
    addAnswer({
      questionId,
      value
    });
  };
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate recommendations based on answers
      const recommendations = calculateRecommendations(answers);
      setRecommendedModules(recommendations);
      onContinue();
    }
  };
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const renderQuestion = () => {
    const questionData = questions[currentQuestionIndex];
    const currentAnswer = answers.find(a => a.questionId === questionData.id)?.value;
    switch (questionData.type) {
      case 'multiple-choice':
        return <MultipleChoiceQuestion question={questionData} selectedValue={currentAnswer as string | string[]} onChange={value => handleAnswer(questionData.id, value)} />;
      case 'scale':
        return <ScaleQuestion question={questionData} selectedValue={currentAnswer as number} onChange={value => handleAnswer(questionData.id, value)} />;
      case 'open-ended':
        return <OpenEndedQuestion question={questionData} value={currentAnswer as string} onChange={value => handleAnswer(questionData.id, value)} />;
      default:
        return <p>Unknown question type</p>;
    }
  };
  const isCurrentQuestionAnswered = () => {
    return answers.some(a => a.questionId === currentQuestion.id);
  };
  return <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#293e40]">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-[#293e40]">
            {progress}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-[#81b5a1] h-2.5 rounded-full" style={{
          width: `${progress}%`
        }}></div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#293e40] mb-2">
            {currentQuestion.question}
          </h3>
          {currentQuestion.description && <p className="text-gray-600">{currentQuestion.description}</p>}
        </div>
        {renderQuestion()}
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!isCurrentQuestionAnswered()}>
          {currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next'}
        </Button>
      </div>
    </div>;
};