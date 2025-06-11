import React, { useState, useRef, createElement } from 'react';
import { Button } from '../Common/Button';
import { useAssessment } from '../../context/AssessmentContext';
import { ModuleRecommendations } from './ModuleRecommendations';
import { ImplementationRoadmap } from './ImplementationRoadmap';
import { ROICalculator } from './ROICalculator';
import { ExecutiveSummary } from './ExecutiveSummary';
import { PrinterIcon, DownloadIcon } from 'lucide-react';
interface ResultsContainerProps {
  onRestart: () => void;
}
export const ResultsContainer = ({
  onRestart
}: ResultsContainerProps) => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const {
    recommendedModules
  } = useAssessment();
  const resultsRef = useRef<HTMLDivElement>(null);
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
  const handlePrint = () => {
    window.print();
  };
  const handleDownload = () => {
    // Create a text version of the results
    const content = resultsRef.current?.innerText || '';
    const blob = new Blob([content], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'servicenow-assessment-results.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#293e40]">
          Your ServiceNow Recommendation Results
        </h2>
        <p className="mt-2 text-xl text-gray-600">
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
        <div className="p-6" ref={resultsRef}>
          {activeTab === 'recommendations' && <ModuleRecommendations modules={recommendedModules} />}
          {activeTab === 'roadmap' && <ImplementationRoadmap modules={recommendedModules} />}
          {activeTab === 'roi' && <ROICalculator modules={recommendedModules} />}
          {activeTab === 'summary' && <ExecutiveSummary modules={recommendedModules} />}
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-4">
        <Button variant="outline" onClick={onRestart}>
          Start New Assessment
        </Button>
        <Button variant="secondary" onClick={handlePrint} className="flex items-center">
          <PrinterIcon className="h-4 w-4 mr-2" />
          Print Results
        </Button>
        <Button onClick={handleDownload} className="flex items-center">
          <DownloadIcon className="h-4 w-4 mr-2" />
          Download Results
        </Button>
      </div>
      {/* Add print-specific styling */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #root > * {
              visibility: hidden;
            }
            .bg-white {
              box-shadow: none !important;
            }
            [ref="resultsRef"], 
            [ref="resultsRef"] * {
              visibility: visible;
            }
            [ref="resultsRef"] {
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        `}
      </style>
    </div>;
};