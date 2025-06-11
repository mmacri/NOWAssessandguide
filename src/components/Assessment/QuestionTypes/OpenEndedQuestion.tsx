import React from 'react';
interface QuestionData {
  id: string;
  question: string;
  description?: string;
  type: 'open-ended';
  placeholder?: string;
}
interface OpenEndedQuestionProps {
  question: QuestionData;
  value: string | undefined;
  onChange: (value: string) => void;
}
export const OpenEndedQuestion = ({
  question,
  value = '',
  onChange
}: OpenEndedQuestionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  return <div>
      <textarea rows={4} placeholder={question.placeholder || 'Enter your answer here...'} value={value} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#81b5a1] focus:ring-[#81b5a1]" />
    </div>;
};