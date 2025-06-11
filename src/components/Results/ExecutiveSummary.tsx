import React from 'react';
import { Button } from '../Common/Button';
import { DownloadIcon, UserPlusIcon, ExternalLinkIcon, BookOpenIcon, CheckCircleIcon } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';
interface Module {
  id: string;
  name: string;
  description: string;
  priority: number;
  benefits: string[];
}
interface ContactInfo {
  firstName?: string;
  lastName?: string;
  company?: string;
  jobTitle?: string;
}
interface ExecutiveSummaryProps {
  modules: Module[];
  contactInfo: ContactInfo | null;
}
export const ExecutiveSummary = ({
  modules,
  contactInfo
}: ExecutiveSummaryProps) => {
  const {
    answers
  } = useAssessment();
  const topModules = modules.slice(0, 3);
  // ServiceNow executive resources
  const executiveResources = {
    general: [{
      title: 'Digital Transformation Playbook',
      url: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/ebook/ebk-digital-workflow-transformation.pdf'
    }, {
      title: 'Executive Value Framework',
      url: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/white-paper/wp-now-platform-business-value.pdf'
    }, {
      title: 'CIO Insights Report',
      url: 'https://www.servicenow.com/workflow/it-transformation/cio-report.html'
    }],
    industry: {
      financial: 'https://www.servicenow.com/solutions/industry/financial-services.html',
      healthcare: 'https://www.servicenow.com/solutions/industry/healthcare.html',
      manufacturing: 'https://www.servicenow.com/solutions/industry/manufacturing.html',
      telecom: 'https://www.servicenow.com/solutions/industry/telecommunications.html',
      government: 'https://www.servicenow.com/solutions/industry/government.html',
      education: 'https://www.servicenow.com/solutions/industry/education.html'
    },
    modules: {
      itsm: 'https://www.servicenow.com/products/itsm.html',
      itom: 'https://www.servicenow.com/products/it-operations-management.html',
      itbm: 'https://www.servicenow.com/products/it-business-management.html',
      hrsd: 'https://www.servicenow.com/products/hr-service-delivery.html',
      csm: 'https://www.servicenow.com/products/customer-service-management.html',
      app_engine: 'https://www.servicenow.com/products/now-platform-app-engine.html'
    }
  };
  // Get strategic insights based on assessment answers
  const getStrategicInsights = () => {
    const insights = [];
    // Check for bottlenecks
    if (answers.some(a => a.questionId === 'bottlenecks' && Array.isArray(a.value) && a.value.length > 0)) {
      const bottlenecks = answers.find(a => a.questionId === 'bottlenecks')?.value as string[];
      if (bottlenecks.includes('cross_dept_communication')) {
        insights.push({
          title: 'Cross-Department Collaboration',
          content: "Your assessment identified cross-department communication as a key challenge. ServiceNow's unified platform connects siloed teams through shared workflows, dashboards, and knowledge bases, enabling seamless collaboration.",
          resource: 'https://www.servicenow.com/workflow/employee-engagement/breaking-down-silos.html'
        });
      }
      if (bottlenecks.includes('approval_workflows')) {
        insights.push({
          title: 'Workflow Automation',
          content: "Complex approval workflows are slowing your operations. ServiceNow's workflow automation can reduce approval times by up to 80% while maintaining compliance and visibility.",
          resource: 'https://www.servicenow.com/products/business-process-automation.html'
        });
      }
    }
    // Check for leadership visibility issues
    if (answers.some(a => a.questionId === 'leadership_visibility' && typeof a.value === 'number' && a.value < 3)) {
      insights.push({
        title: 'Executive Visibility',
        content: "Your leadership lacks visibility into operational performance. ServiceNow's Performance Analytics provides real-time dashboards and KPIs tailored for executive decision-making.",
        resource: 'https://www.servicenow.com/products/performance-analytics.html'
      });
    }
    // Check for integration challenges
    if (answers.some(a => a.questionId === 'tool_integration' && ['minimal_integration', 'complete_silos'].includes(a.value as string))) {
      insights.push({
        title: 'Platform Unification',
        content: "Your siloed systems are creating inefficiencies. ServiceNow's platform approach eliminates fragmentation by connecting people, functions, and systems through a single enterprise cloud solution.",
        resource: 'https://www.servicenow.com/now-platform.html'
      });
    }
    // Add a default insight if none apply
    if (insights.length === 0) {
      insights.push({
        title: 'Digital Transformation',
        content: 'ServiceNow can accelerate your digital transformation by connecting people, functions, and systems through digital workflows, increasing productivity and enhancing experiences.',
        resource: 'https://www.servicenow.com/solutions/digital-transformation.html'
      });
    }
    return insights;
  };
  const strategicInsights = getStrategicInsights();
  // Determine relevant industry based on assessment answers (simplified)
  const getRelevantIndustry = () => {
    // This would be more sophisticated in a real implementation
    // For now, just return a default
    return 'financial';
  };
  const industry = getRelevantIndustry();
  return <div>
      <h3 className="text-xl font-semibold text-[#293e40] mb-4">
        Executive Summary
      </h3>
      <div className="bg-[#f8fcfa] rounded-lg p-6 mb-6 border border-gray-100">
        <h4 className="text-lg font-medium text-[#293e40] mb-2">
          Assessment Overview
        </h4>
        <p className="text-gray-600">
          Based on your assessment responses, we've identified key operational
          challenges and opportunities for
          {contactInfo?.company ? ` ${contactInfo.company}` : ' your organization'}
          . The following summary provides a strategic overview of our
          recommendations to address these challenges and drive business value
          through ServiceNow.
        </p>
      </div>
      {/* Strategic Insights based on assessment */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-[#293e40] mb-4 flex items-center">
          <BookOpenIcon className="h-5 w-5 mr-2 text-[#81b5a1]" />
          Strategic Insights
        </h4>
        <div className="space-y-4">
          {strategicInsights.map((insight, index) => <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-[#293e40]">{insight.title}</h5>
              <p className="mt-1 text-sm text-gray-600">{insight.content}</p>
              <a href={insight.resource} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-sm text-[#2e6d7e] hover:text-[#81b5a1]">
                Learn more
                <ExternalLinkIcon className="ml-1 h-4 w-4" />
              </a>
            </div>)}
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-medium text-[#293e40] mb-4">
          Key Findings & Recommendations
        </h4>
        <div className="space-y-4">
          {topModules.map(module => <div key={module.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h5 className="font-medium text-[#293e40]">{module.name}</h5>
                <a href={executiveResources.modules[module.id as keyof typeof executiveResources.modules] || '#'} target="_blank" rel="noopener noreferrer" className="text-xs text-[#2e6d7e] hover:text-[#81b5a1] flex items-center">
                  Product Details
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
              <p className="mt-1 text-sm text-gray-600">{module.description}</p>
              <div className="mt-2">
                <p className="text-sm font-medium text-[#293e40]">
                  Key Benefit:
                </p>
                <p className="text-sm text-gray-600">{module.benefits[0]}</p>
              </div>
            </div>)}
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-lg font-medium text-[#293e40] mb-4">
          Strategic Business Impact
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-[#edf7f4] rounded-lg p-4 border border-[#d1e9e0]">
            <h5 className="font-medium text-[#293e40]">
              Operational Efficiency
            </h5>
            <p className="mt-2 text-sm text-gray-600">
              Streamline processes and reduce manual effort, enabling teams to
              focus on strategic initiatives.
            </p>
            <a href="https://www.servicenow.com/workflow/process-optimization.html" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-xs text-[#2e6d7e] hover:text-[#81b5a1]">
              Read efficiency case studies
              <ExternalLinkIcon className="ml-1 h-3 w-3" />
            </a>
          </div>
          <div className="bg-[#e6f0f2] rounded-lg p-4 border border-[#c8e0e5]">
            <h5 className="font-medium text-[#293e40]">Service Quality</h5>
            <p className="mt-2 text-sm text-gray-600">
              Improve response times and first-call resolution rates, enhancing
              both employee and customer satisfaction.
            </p>
            <a href="https://www.servicenow.com/workflow/customer-experience.html" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-xs text-[#2e6d7e] hover:text-[#81b5a1]">
              Explore service quality metrics
              <ExternalLinkIcon className="ml-1 h-3 w-3" />
            </a>
          </div>
          <div className="bg-[#f0eef9] rounded-lg p-4 border border-[#d9d4ef]">
            <h5 className="font-medium text-[#293e40]">Business Agility</h5>
            <p className="mt-2 text-sm text-gray-600">
              Gain the flexibility to adapt quickly to changing business
              requirements and market conditions.
            </p>
            <a href="https://www.servicenow.com/workflow/digital-transformation.html" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center text-xs text-[#2e6d7e] hover:text-[#81b5a1]">
              Learn about agile transformation
              <ExternalLinkIcon className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h4 className="text-lg font-medium text-[#293e40] mb-4">Next Steps</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">1.</span>
              <div>
                <span>
                  Schedule a detailed consultation with our ServiceNow experts
                  to discuss your specific requirements
                </span>
                <a href="https://www.servicenow.com/services/consulting-services.html" target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center text-xs text-[#2e6d7e] hover:text-[#81b5a1]">
                  Consulting services
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2">2.</span>
              <div>
                <span>
                  Review the implementation roadmap and align with key
                  stakeholders
                </span>
                <a href="https://www.servicenow.com/services/deploy.html" target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center text-xs text-[#2e6d7e] hover:text-[#81b5a1]">
                  Implementation methodology
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2">3.</span>
              <div>
                <span>Begin planning for the initial implementation phase</span>
                <a href="https://www.servicenow.com/success/journey/implement.html" target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center text-xs text-[#2e6d7e] hover:text-[#81b5a1]">
                  Implementation resources
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2">4.</span>
              <div>
                <span>
                  Establish success metrics and ROI tracking mechanisms
                </span>
                <a href="https://www.servicenow.com/services/customer-success-center/value-realization.html" target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center text-xs text-[#2e6d7e] hover:text-[#81b5a1]">
                  Value realization framework
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            </li>
          </ol>
        </div>
      </div>
      {/* Industry-specific resources */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-[#293e40] mb-4">
          Industry-Specific Resources
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(executiveResources.industry).map(([key, url]) => <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-lg border flex items-center ${key === industry ? 'bg-[#edf7f4] border-[#81b5a1]' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
              {key === industry && <CheckCircleIcon className="h-5 w-5 text-[#81b5a1] mr-2" />}
              <span className="font-medium text-[#293e40] capitalize">
                {key.replace('_', ' ')} Industry Solutions
              </span>
              <ExternalLinkIcon className="h-4 w-4 ml-auto text-[#81b5a1]" />
            </a>)}
        </div>
      </div>
      {/* Executive Resources */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-[#293e40] mb-4">
          Additional Executive Resources
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {executiveResources.general.map((resource, index) => <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg border border-gray-200 hover:bg-[#f8fcfa] transition-colors">
              <h5 className="font-medium text-[#293e40] flex items-center">
                <BookOpenIcon className="h-4 w-4 mr-2 text-[#81b5a1]" />
                {resource.title}
              </h5>
              <div className="mt-2 flex justify-end">
                <span className="text-xs text-[#2e6d7e] flex items-center">
                  View resource
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </span>
              </div>
            </a>)}
        </div>
      </div>
      {contactInfo ? <div className="flex justify-center">
          <Button className="flex items-center">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download Full Executive Summary (PDF)
          </Button>
        </div> : <div className="flex justify-center">
          <Button className="flex items-center">
            <UserPlusIcon className="h-4 w-4 mr-2" />
            Share Contact Info for Full Report
          </Button>
        </div>}
    </div>;
};