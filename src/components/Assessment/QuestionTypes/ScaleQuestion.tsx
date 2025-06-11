import React from 'react';
interface QuestionData {
  id: string;
  question: string;
  description?: string;
  type: 'scale';
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
}
interface ScaleQuestionProps {
  question: QuestionData;
  selectedValue: number | undefined;
  onChange: (value: number) => void;
}
export const ScaleQuestion = ({
  question,
  selectedValue,
  onChange
}: ScaleQuestionProps) => {
  const {
    min,
    max,
    minLabel,
    maxLabel
  } = question;
  const handleChange = (value: number) => {
    onChange(value);
  };
  return <div className="py-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">{minLabel || min}</span>
        <span className="text-sm text-gray-500">{maxLabel || max}</span>
      </div>
      <div className="flex justify-between items-center space-x-2">
        {Array.from({
        length: max - min + 1
      }, (_, i) => min + i).map(value => <button key={value} type="button" onClick={() => handleChange(value)} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
              ${selectedValue === value ? 'bg-[#81b5a1] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {value}
          </button>)}
      </div>
    </div>;
};