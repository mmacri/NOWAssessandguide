import React from 'react';
import { CloudIcon } from 'lucide-react';
export const Header = () => {
  return <header className="bg-[#293e40] shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <CloudIcon className="h-8 w-8 text-[#81b5a1] mr-3" />
          <h1 className="text-xl font-bold text-white">
            ServiceNow Solution Advisor
          </h1>
        </div>
        <div>
          <span className="text-sm text-gray-300">
            Powered by AI-driven recommendations
          </span>
        </div>
      </div>
    </header>;
};