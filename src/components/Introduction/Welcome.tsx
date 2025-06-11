import React from 'react';
import { Button } from '../Common/Button';
import { RocketIcon, LightbulbIcon, BarChart3Icon } from 'lucide-react';
interface WelcomeProps {
  onContinue: () => void;
}
export const Welcome = ({
  onContinue
}: WelcomeProps) => {
  return <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-[#293e40] sm:text-4xl">
          Discover Your Ideal ServiceNow Solution
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Complete our quick assessment to receive tailored module
          recommendations and a practical implementation roadmap.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10 border border-gray-100">
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf7f4]">
                <LightbulbIcon className="h-6 w-6 text-[#81b5a1]" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-[#293e40]">
                Identify Key Challenges
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Pinpoint your organization's unique operational challenges and
                priorities.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf7f4]">
                <BarChart3Icon className="h-6 w-6 text-[#81b5a1]" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-[#293e40]">
                Receive Expert Recommendations
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Get tailored ServiceNow module recommendations based on your
                business needs.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf7f4]">
                <RocketIcon className="h-6 w-6 text-[#81b5a1]" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-[#293e40]">
                Implementation Roadmap
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Access a detailed implementation plan with timeline and resource
                recommendations.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#f8fcfa] px-6 py-4 text-center border-t border-gray-100">
          <p className="text-sm text-gray-600">
            This assessment takes approximately 7-10 minutes to complete.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={onContinue} size="lg">
          Start Assessment
        </Button>
      </div>
    </div>;
};