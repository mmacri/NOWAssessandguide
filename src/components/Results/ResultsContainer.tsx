import React, { useState } from 'react';
import { Button } from '../Common/Button';
import { useAssessment } from '../../context/AssessmentContext';
import { ModuleRecommendations } from './ModuleRecommendations';
import { ImplementationRoadmap } from './ImplementationRoadmap';
import { ROICalculator } from './ROICalculator';
import { ExecutiveSummary } from './ExecutiveSummary';
interface ResultsContainerProps {
  onRestart: () => void;
}
export const ResultsContainer = ({
  onRestart
}: ResultsContainerProps) => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const {
    recommendedModules,
    contactInfo
  } = useAssessment();
  const tabs = [{
    id: 'recommendations',
    label: 'Recommendations'
  }, {
    id: 'roadmap',
    label: 'Implementation Roadmap'
  }, {
    id: 'roi',
    label: 'ROI Calculator'
  }, {
    id: 'summary',
    label: 'Executive Summary'
  }];
  return <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#293e40]">
          Your ServiceNow Recommendation Results
        </h2>
        <p className="mt-2 text-xl text-gray-600">
          {contactInfo?.firstName ? `Thank you, ${contactInfo.firstName}!` : 'Thank you for completing the assessment!'}{' '}
          Here are your personalized ServiceNow recommendations.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-6 text-sm font-medium transition-colors ${activeTab === tab.id ? 'border-b-2 border-[#81b5a1] text-[#293e40]' : 'text-gray-500 hover:text-[#293e40] hover:border-gray-300'}`}>
                {tab.label}
              </button>)}
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'recommendations' && <ModuleRecommendations modules={recommendedModules} />}
          {activeTab === 'roadmap' && <ImplementationRoadmap modules={recommendedModules} />}
          {activeTab === 'roi' && <ROICalculator modules={recommendedModules} />}
          {activeTab === 'summary' && <ExecutiveSummary modules={recommendedModules} contactInfo={contactInfo} />}
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <Button variant="outline" onClick={onRestart}>
          Start New Assessment
        </Button>
        <Button variant="secondary">Schedule Consultation</Button>
      </div>
      {!contactInfo && <div className="mt-8 bg-[#edf7f4] p-4 rounded-lg border border-[#d1e9e0] text-center">
          <p className="text-[#293e40] font-medium mb-2">
            Want to save your results or receive more detailed insights?
          </p>
          <p className="text-gray-600 mb-4">
            Provide your contact information to receive a comprehensive report
            and personalized consultation.
          </p>
          <Button onClick={onRestart}>Share Contact Information</Button>
        </div>}
    </div>;
};