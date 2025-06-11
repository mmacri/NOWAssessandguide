import React from 'react';
interface Option {
  value: string;
  label: string;
}
interface QuestionData {
  id: string;
  question: string;
  description?: string;
  type: 'multiple-choice';
  options: Option[];
  multiSelect?: boolean;
}
interface MultipleChoiceQuestionProps {
  question: QuestionData;
  selectedValue: string | string[];
  onChange: (value: string | string[]) => void;
}
export const MultipleChoiceQuestion = ({
  question,
  selectedValue,
  onChange
}: MultipleChoiceQuestionProps) => {
  const handleChange = (value: string) => {
    if (question.multiSelect) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
      if (currentValues.includes(value)) {
        onChange(currentValues.filter(v => v !== value));
      } else {
        onChange([...currentValues, value]);
      }
    } else {
      onChange(value);
    }
  };
  const isSelected = (value: string) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(value);
    }
    return selectedValue === value;
  };
  return <div className="space-y-4">
      {question.options.map(option => <div key={option.value} className={`relative rounded-lg border p-4 cursor-pointer transition-colors
            ${isSelected(option.value) ? 'bg-[#edf7f4] border-[#81b5a1]' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => handleChange(option.value)}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {question.multiSelect ? <div className={`w-5 h-5 border rounded ${isSelected(option.value) ? 'bg-[#81b5a1] border-[#81b5a1]' : 'border-gray-300'} flex items-center justify-center`}>
                  {isSelected(option.value) && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>}
                </div> : <div className={`w-5 h-5 border rounded-full ${isSelected(option.value) ? 'border-[#81b5a1]' : 'border-gray-300'} flex items-center justify-center`}>
                  {isSelected(option.value) && <div className="w-2.5 h-2.5 rounded-full bg-[#81b5a1]"></div>}
                </div>}
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-800">
                {option.label}
              </label>
            </div>
          </div>
        </div>)}
    </div>;
};