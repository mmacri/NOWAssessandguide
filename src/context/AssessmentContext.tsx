import React, { useState, createContext, useContext } from 'react';
interface Answer {
  questionId: string;
  value: string | number | string[];
}
interface RecommendedModule {
  id: string;
  name: string;
  description: string;
  priority: number;
  benefits: string[];
}
interface AssessmentContextType {
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  recommendedModules: RecommendedModule[];
  setRecommendedModules: (modules: RecommendedModule[]) => void;
}
const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);
export const AssessmentProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [recommendedModules, setRecommendedModules] = useState<RecommendedModule[]>([]);
  const addAnswer = (answer: Answer) => {
    setAnswers(prev => {
      // Remove any existing answer for this question
      const filtered = prev.filter(a => a.questionId !== answer.questionId);
      // Add the new answer
      return [...filtered, answer];
    });
  };
  return <AssessmentContext.Provider value={{
    answers,
    addAnswer,
    recommendedModules,
    setRecommendedModules
  }}>
      {children}
    </AssessmentContext.Provider>;
};
export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};