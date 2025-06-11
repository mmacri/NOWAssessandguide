import React from 'react';
import { CalendarIcon, CheckIcon, ClockIcon, FileTextIcon, ExternalLinkIcon } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';
interface Module {
  id: string;
  name: string;
  description: string;
  priority: number;
  implementationTime: string;
}
interface ImplementationRoadmapProps {
  modules: Module[];
}
export const ImplementationRoadmap = ({
  modules
}: ImplementationRoadmapProps) => {
  const {
    answers
  } = useAssessment();
  const topModules = modules.slice(0, 3);
  // Calculate estimated timeline based on module priorities
  const getTimelinePosition = (priority: number) => {
    switch (priority) {
      case 1:
        return {
          start: 0,
          end: getMonthsFromTimeframe(topModules[0].implementationTime)
        };
      case 2:
        return {
          start: getMonthsFromTimeframe(topModules[0].implementationTime) * 0.5,
          end: getMonthsFromTimeframe(topModules[0].implementationTime) * 0.5 + getMonthsFromTimeframe(topModules[1].implementationTime)
        };
      case 3:
        return {
          start: getMonthsFromTimeframe(topModules[0].implementationTime) * 0.75,
          end: getMonthsFromTimeframe(topModules[0].implementationTime) * 0.75 + getMonthsFromTimeframe(topModules[2].implementationTime)
        };
      default:
        return {
          start: 0,
          end: 0
        };
    }
  };
  // Helper function to extract months from implementation time string
  const getMonthsFromTimeframe = (timeframe: string) => {
    const match = timeframe.match(/(\d+)-(\d+)/);
    if (match) {
      return (parseInt(match[1]) + parseInt(match[2])) / 2;
    }
    return 3; // Default to 3 months if format is not recognized
  };
  // Calculate total implementation time
  const totalMonths = Math.ceil(Math.max(...topModules.map(m => getTimelinePosition(m.priority).end)));
  // Generate month labels for the timeline
  const monthLabels = Array.from({
    length: totalMonths + 1
  }, (_, i) => `Month ${i}`);
  // ServiceNow implementation resources
  const implementationResources = {
    general: [{
      title: 'ServiceNow Implementation Methodology',
      description: "Learn about ServiceNow's official implementation methodology",
      url: 'https://www.servicenow.com/services/deploy.html'
    }, {
      title: 'ServiceNow Success Playbooks',
      description: 'Step-by-step guidance for successful implementations',
      url: 'https://www.servicenow.com/success/playbooks.html'
    }, {
      title: 'Customer Success Best Practices',
      description: 'Proven approaches to maximize your ServiceNow investment',
      url: 'https://www.servicenow.com/success/best-practices.html'
    }],
    planning: [{
      title: 'Implementation Planning Guide',
      description: 'Comprehensive planning checklist for ServiceNow projects',
      url: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/success/playbook/implementation-checklist.pdf'
    }, {
      title: 'ServiceNow Value Framework',
      description: 'Align your implementation with business outcomes',
      url: 'https://www.servicenow.com/services/customer-success-center/value-realization.html'
    }],
    execution: [{
      title: 'Technical Best Practices Guide',
      description: 'Technical recommendations for your ServiceNow instance',
      url: 'https://docs.servicenow.com/bundle/tokyo-platform-administration/page/administer/reference-pages/reference/r_BestPracticesForOptimalPerformance.html'
    }, {
      title: 'Integration Best Practices',
      description: 'Guidelines for integrating ServiceNow with other systems',
      url: 'https://developer.servicenow.com/dev.do#!/learn/learning-plans/orlando/servicenow_application_developer/app_store_learnv2_integrationhub_orlando_integrations_concepts'
    }],
    adoption: [{
      title: 'User Adoption Toolkit',
      description: 'Resources to drive user adoption and change management',
      url: 'https://www.servicenow.com/success/accelerate/user-adoption-toolkit.html'
    }, {
      title: 'ServiceNow Training Resources',
      description: 'Training materials for administrators and end users',
      url: 'https://www.servicenow.com/services/training-and-certification.html'
    }]
  };
  // Get implementation tips based on assessment answers
  const getImplementationTips = () => {
    const tips = [];
    // Check if they have integration issues
    if (answers.some(a => a.questionId === 'tool_integration' && ['minimal_integration', 'complete_silos'].includes(a.value as string))) {
      tips.push({
        title: 'Integration Strategy',
        content: 'Your assessment indicates integration challenges. Prioritize developing a comprehensive integration strategy early in your implementation. Consider using ServiceNow IntegrationHub and Flow Designer to connect your systems.',
        resource: {
          title: 'IntegrationHub Documentation',
          url: 'https://docs.servicenow.com/bundle/tokyo-application-development/page/administer/integrationhub/concept/integrationhub.html'
        }
      });
    }
    // Check if they have leadership visibility issues
    if (answers.some(a => a.questionId === 'leadership_visibility' && typeof a.value === 'number' && a.value < 3)) {
      tips.push({
        title: 'Executive Dashboards',
        content: 'Leadership visibility was identified as a challenge. Implement Performance Analytics dashboards early to provide executives with visibility into the implementation progress and value realization.',
        resource: {
          title: 'Performance Analytics Guide',
          url: 'https://docs.servicenow.com/bundle/tokyo-performance-analytics-and-reporting/page/use/performance-analytics/concept/c_PerformanceAnalytics.html'
        }
      });
    }
    // Check if they have manual processes
    if (answers.some(a => a.questionId === 'manual_processes' && typeof a.value === 'string' && a.value.length > 0)) {
      tips.push({
        title: 'Process Automation',
        content: "Your organization has significant manual processes. Focus on workflow automation and process design before technical configuration to ensure you're optimizing processes, not just digitizing them.",
        resource: {
          title: 'Workflow and Process Automation',
          url: 'https://www.servicenow.com/products/business-process-automation.html'
        }
      });
    }
    // Add a general tip if no specific ones apply
    if (tips.length === 0) {
      tips.push({
        title: 'Phased Implementation',
        content: 'Consider a phased implementation approach, focusing on quick wins first to demonstrate value and build momentum for your ServiceNow journey.',
        resource: {
          title: 'Implementation Success Factors',
          url: 'https://www.servicenow.com/success/journey/implement.html'
        }
      });
    }
    return tips;
  };
  const implementationTips = getImplementationTips();
  return <div>
      <h3 className="text-xl font-semibold text-[#293e40] mb-4">
        Implementation Roadmap
      </h3>
      <div className="mb-6">
        <p className="text-gray-600">
          This roadmap provides a strategic timeline for implementing your
          recommended ServiceNow modules. The phases are designed to maximize
          value while minimizing disruption to your business operations.
        </p>
      </div>
      {/* Implementation Tips based on assessment */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-[#293e40] mb-3">
          Tailored Implementation Tips
        </h4>
        <div className="space-y-4">
          {implementationTips.map((tip, index) => <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="font-medium text-[#293e40] flex items-center">
                <FileTextIcon className="h-4 w-4 mr-2 text-[#81b5a1]" />
                {tip.title}
              </h5>
              <p className="mt-1 text-sm text-gray-600">{tip.content}</p>
              {tip.resource && <a href={tip.resource.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-xs text-[#2e6d7e] hover:text-[#81b5a1]">
                  {tip.resource.title}
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>}
            </div>)}
        </div>
      </div>
      {/* Timeline visualization */}
      <div className="mt-8 mb-10">
        <h4 className="text-lg font-medium text-[#293e40] mb-4">
          Implementation Timeline
        </h4>
        <div className="flex justify-between mb-2">
          {monthLabels.map((label, index) => <div key={index} className="text-xs text-gray-500">
              {label}
            </div>)}
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-8 relative">
          {/* Timeline markers */}
          {monthLabels.map((_, index) => <div key={index} className="absolute h-3 w-3 bg-gray-400 rounded-full" style={{
          left: `${index / totalMonths * 100}%`,
          top: '-4px'
        }}></div>)}
        </div>
        {/* Module implementation bars */}
        <div className="space-y-6">
          {topModules.map(module => {
          const position = getTimelinePosition(module.priority);
          const startPercent = position.start / totalMonths * 100;
          const widthPercent = (position.end - position.start) / totalMonths * 100;
          return <div key={module.id} className="relative">
                <div className="flex items-center mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${module.priority === 1 ? 'bg-[#edf7f4] text-[#81b5a1]' : module.priority === 2 ? 'bg-[#e6f0f2] text-[#2e6d7e]' : 'bg-[#f0eef9] text-[#6b46c1]'}`}>
                    {module.priority}
                  </div>
                  <h4 className="text-sm font-medium text-[#293e40]">
                    {module.name}
                  </h4>
                </div>
                <div className="h-10 w-full bg-gray-100 rounded-md relative">
                  <div className={`absolute h-full rounded-md flex items-center px-3 ${module.priority === 1 ? 'bg-[#81b5a1]' : module.priority === 2 ? 'bg-[#2e6d7e]' : 'bg-[#6b46c1]'}`} style={{
                left: `${startPercent}%`,
                width: `${widthPercent}%`
              }}>
                    <span className="text-xs font-medium text-white truncate">
                      {module.implementationTime}
                    </span>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
      {/* Implementation phases */}
      <div className="mt-10">
        <h4 className="text-lg font-medium text-[#293e40] mb-4">
          Implementation Phases
        </h4>
        <div className="space-y-4">
          <div className="bg-[#f8fcfa] p-4 rounded-lg border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CalendarIcon className="h-5 w-5 text-[#81b5a1]" />
              </div>
              <div className="ml-3">
                <h5 className="text-sm font-medium text-[#293e40]">
                  Planning & Discovery
                </h5>
                <p className="mt-1 text-sm text-gray-600">
                  Requirements gathering, stakeholder alignment, and project
                  planning.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {implementationResources.planning.map((resource, index) => <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs bg-white text-[#2e6d7e] px-2 py-1 rounded-full border border-[#e6f0f2] hover:bg-[#edf7f4] transition-colors">
                      {resource.title}
                      <ExternalLinkIcon className="ml-1 h-3 w-3" />
                    </a>)}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f8fcfa] p-4 rounded-lg border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <ClockIcon className="h-5 w-5 text-[#81b5a1]" />
              </div>
              <div className="ml-3">
                <h5 className="text-sm font-medium text-[#293e40]">
                  Implementation & Configuration
                </h5>
                <p className="mt-1 text-sm text-gray-600">
                  System setup, data migration, integration, and customization.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {implementationResources.execution.map((resource, index) => <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs bg-white text-[#2e6d7e] px-2 py-1 rounded-full border border-[#e6f0f2] hover:bg-[#edf7f4] transition-colors">
                      {resource.title}
                      <ExternalLinkIcon className="ml-1 h-3 w-3" />
                    </a>)}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f8fcfa] p-4 rounded-lg border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <CheckIcon className="h-5 w-5 text-[#81b5a1]" />
              </div>
              <div className="ml-3">
                <h5 className="text-sm font-medium text-[#293e40]">
                  Testing & Deployment
                </h5>
                <p className="mt-1 text-sm text-gray-600">
                  User acceptance testing, training, and go-live preparation.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {implementationResources.adoption.map((resource, index) => <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs bg-white text-[#2e6d7e] px-2 py-1 rounded-full border border-[#e6f0f2] hover:bg-[#edf7f4] transition-colors">
                      {resource.title}
                      <ExternalLinkIcon className="ml-1 h-3 w-3" />
                    </a>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* General ServiceNow implementation resources */}
      <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium text-[#293e40] mb-3">
          ServiceNow Implementation Resources
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {implementationResources.general.map((resource, index) => <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-100 rounded-md hover:bg-[#f8fcfa] transition-colors">
              <h5 className="font-medium text-[#293e40] flex items-center">
                {resource.title}
                <ExternalLinkIcon className="ml-1 h-3 w-3 text-[#81b5a1]" />
              </h5>
              <p className="mt-1 text-xs text-gray-500">
                {resource.description}
              </p>
            </a>)}
        </div>
      </div>
    </div>;
};