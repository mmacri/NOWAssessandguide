import React from 'react';
import { CheckIcon } from 'lucide-react';
interface Step {
  id: number;
  name: string;
  component: React.ReactNode;
}
interface StepperProps {
  steps: Step[];
  currentStep: number;
}
export const Stepper = ({
  steps,
  currentStep
}: StepperProps) => {
  return <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => <li key={step.id} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} ${index !== 0 ? 'pl-8 sm:pl-20' : ''} flex-grow flex`}>
            {index !== 0 && <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={`h-0.5 w-full ${index <= currentStep ? 'bg-[#81b5a1]' : 'bg-gray-200'}`}></div>
              </div>}
            <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${index < currentStep ? 'bg-[#81b5a1]' : index === currentStep ? 'bg-[#2e6d7e]' : 'bg-gray-200'}`}>
              {index < currentStep ? <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" /> : <span className={`text-sm font-medium ${index === currentStep ? 'text-white' : 'text-gray-500'}`}>
                  {index + 1}
                </span>}
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {step.name}
            </span>
          </li>)}
      </ol>
    </nav>;
};