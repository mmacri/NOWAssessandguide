import React from 'react';
import { CheckCircleIcon, ExternalLinkIcon, BookOpenIcon } from 'lucide-react';
import { Button } from '../Common/Button';
import { useAssessment } from '../../context/AssessmentContext';
interface Module {
  id: string;
  name: string;
  description: string;
  priority: number;
  benefits: string[];
  implementationTime: string;
  complexity: string;
}
interface ModuleRecommendationsProps {
  modules: Module[];
}
export const ModuleRecommendations = ({
  modules
}: ModuleRecommendationsProps) => {
  const {
    answers
  } = useAssessment();
  // Take top 3 recommended modules
  const topModules = modules.slice(0, 3);
  // Map ServiceNow module IDs to their respective product pages and resources
  const moduleResources = {
    itsm: {
      productPage: 'https://www.servicenow.com/products/itsm.html',
      documentation: 'https://docs.servicenow.com/bundle/tokyo-it-service-management/page/product/it-service-management/concept/c_ITServiceManagement.html',
      successStories: 'https://www.servicenow.com/customers/itsm.html',
      communityForum: 'https://community.servicenow.com/community?id=community_forum&sys_id=a53dff31dbd897c068c1fb651f961926',
      implementationGuide: 'https://www.servicenow.com/content/dam/servicenow/other-documents/training/ServiceNow-Getting-Started-Implementation-Checklist.pdf'
    },
    itom: {
      productPage: 'https://www.servicenow.com/products/it-operations-management.html',
      documentation: 'https://docs.servicenow.com/bundle/tokyo-it-operations-management/page/product/it-operations-management/concept/it-operations-management.html',
      successStories: 'https://www.servicenow.com/customers/itom.html',
      communityForum: 'https://community.servicenow.com/community?id=community_forum&sys_id=4c6a29a1dbd897c068c1fb651f9619b6',
      bestPractices: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/white-paper/wp-operational-intelligence.pdf'
    },
    itbm: {
      productPage: 'https://www.servicenow.com/products/it-business-management.html',
      documentation: 'https://docs.servicenow.com/bundle/tokyo-it-business-management/page/product/it-business-management/concept/it-business-management.html',
      successStories: 'https://www.servicenow.com/customers/itbm.html',
      communityForum: 'https://community.servicenow.com/community?id=community_forum&sys_id=4d6a29a1dbd897c068c1fb651f9619b7',
      valueCalculator: 'https://www.servicenow.com/lpebk/it-business-management-value-calculator.html'
    },
    hrsd: {
      productPage: 'https://www.servicenow.com/products/hr-service-delivery.html',
      documentation: 'https://docs.servicenow.com/bundle/tokyo-hr-service-delivery/page/product/human-resources/concept/c_HRServiceDelivery.html',
      successStories: 'https://www.servicenow.com/customers/hr.html',
      communityForum: 'https://community.servicenow.com/community?id=community_forum&sys_id=b6fb9421dbcf13c02b6dfb651f9619ef',
      bestPractices: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/ebook/ebk-hr-service-delivery-benchmark-report.pdf'
    },
    csm: {
      productPage: 'https://www.servicenow.com/products/customer-service-management.html',
      documentation: 'https://docs.servicenow.com/bundle/tokyo-customer-service-management/page/product/customer-service-management/concept/customer-service-management.html',
      successStories: 'https://www.servicenow.com/customers/csm.html',
      communityForum: 'https://community.servicenow.com/community?id=community_forum&sys_id=906a29a1dbd897c068c1fb651f9619b7',
      bestPractices: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/white-paper/wp-forrester-tei-csm.pdf'
    },
    app_engine: {
      productPage: 'https://www.servicenow.com/products/now-platform-app-engine.html',
      documentation: 'https://developer.servicenow.com/dev.do',
      successStories: 'https://www.servicenow.com/customers/app-dev.html',
      communityForum: 'https://community.servicenow.com/community?id=community_forum&sys_id=a46a29a1dbd897c068c1fb651f9619b4',
      training: 'https://developer.servicenow.com/dev.do#!/learn/learning-plans/quebec'
    }
  };
  // Get tailored advice based on assessment answers
  const getTailoredAdvice = (moduleId: string) => {
    switch (moduleId) {
      case 'itsm':
        // Check if they have incident response issues
        if (answers.some(a => a.questionId === 'incident_response' && ['day', 'days', 'week_plus'].includes(a.value as string))) {
          return "Your assessment indicates long incident resolution times. Focus on implementing ServiceNow's Incident Management and Major Incident Management first to establish clear workflows and SLAs.";
        }
        return 'Based on your responses, prioritize setting up a service catalog and knowledge base to improve self-service capabilities.';
      case 'itom':
        // Check if they have service disruption issues
        if (answers.some(a => a.questionId === 'service_disruptions' && typeof a.value === 'number' && a.value > 3)) {
          return "With your high frequency of service disruptions, implement ServiceNow's Event Management and Service Mapping to gain visibility into your infrastructure and reduce outages.";
        }
        return 'Consider starting with Discovery and CMDB to establish a solid foundation for your IT operations management journey.';
      case 'itbm':
        // Check if they have leadership visibility issues
        if (answers.some(a => a.questionId === 'leadership_visibility' && typeof a.value === 'number' && a.value < 3)) {
          return "Your leadership lacks visibility into IT operations. Implement ServiceNow's Performance Analytics and IT Business Management dashboards to provide real-time insights.";
        }
        return 'Focus on Project Portfolio Management to better align IT investments with business outcomes.';
      case 'hrsd':
        // Check if HR automation is a priority
        if (answers.some(a => a.questionId === 'automation_priority' && Array.isArray(a.value) && a.value.includes('hr'))) {
          return 'Since HR automation is a priority, start with Employee Service Center and Case Management to streamline employee requests and inquiries.';
        }
        return 'Consider implementing Employee Document Management and HR Service Delivery to improve employee experience.';
      case 'csm':
        // Check if customer service automation is a priority
        if (answers.some(a => a.questionId === 'automation_priority' && Array.isArray(a.value) && a.value.includes('customer_service'))) {
          return 'With customer service as a priority, implement Customer Service Management with Field Service Management to improve customer satisfaction and first-call resolution rates.';
        }
        return 'Start with Customer Service Portal and Knowledge Management to enhance self-service capabilities for your customers.';
      case 'app_engine':
        // Check if they have integration issues
        if (answers.some(a => a.questionId === 'tool_integration' && ['minimal_integration', 'complete_silos'].includes(a.value as string))) {
          return "Your assessment shows integration challenges. Use ServiceNow's App Engine with Flow Designer and IntegrationHub to connect your siloed systems without extensive coding.";
        }
        return 'Consider using App Engine to rapidly develop custom applications that address your unique business processes.';
      default:
        return 'Implement this module with a phased approach, focusing on quick wins first to demonstrate value.';
    }
  };
  return <div>
      <h3 className="text-xl font-semibold text-[#293e40] mb-4">
        Your Top Module Recommendations
      </h3>
      <div className="space-y-6">
        {topModules.map(module => {
        const resources = moduleResources[module.id as keyof typeof moduleResources] || {};
        return <div key={module.id} className="bg-[#f8fcfa] rounded-lg p-6 border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${module.priority === 1 ? 'bg-[#edf7f4] text-[#81b5a1]' : module.priority === 2 ? 'bg-[#e6f0f2] text-[#2e6d7e]' : 'bg-[#f0eef9] text-[#6b46c1]'}`}>
                    {module.priority}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-semibold text-[#293e40]">
                      {module.name}
                    </h4>
                    {resources.productPage && <a href={resources.productPage} target="_blank" rel="noopener noreferrer" className="text-[#2e6d7e] hover:text-[#81b5a1] flex items-center text-sm">
                        Product Page
                        <ExternalLinkIcon className="ml-1 h-3 w-3" />
                      </a>}
                  </div>
                  <p className="mt-1 text-gray-600">{module.description}</p>
                  {/* Tailored advice based on assessment answers */}
                  <div className="mt-4 bg-white p-3 rounded-md border border-[#d1e9e0]">
                    <h5 className="text-sm font-medium text-[#293e40] flex items-center">
                      <BookOpenIcon className="h-4 w-4 mr-1 text-[#81b5a1]" />
                      Tailored Recommendation:
                    </h5>
                    <p className="mt-1 text-sm text-gray-700">
                      {getTailoredAdvice(module.id)}
                    </p>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-[#293e40]">
                      Key Benefits:
                    </h5>
                    <ul className="mt-2 space-y-2">
                      {module.benefits.map((benefit, index) => <li key={index} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-[#81b5a1] mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {benefit}
                          </span>
                        </li>)}
                    </ul>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span className="mr-4">
                      <strong>Implementation:</strong>{' '}
                      {module.implementationTime}
                    </span>
                    <span>
                      <strong>Complexity:</strong> {module.complexity}
                    </span>
                  </div>
                  {/* ServiceNow Resources */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-[#293e40] mb-2">
                      ServiceNow Resources:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {resources.documentation && <a href={resources.documentation} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#e6f0f2] text-[#2e6d7e] px-2 py-1 rounded-full hover:bg-[#d1e9e0] transition-colors">
                          Documentation
                        </a>}
                      {resources.successStories && <a href={resources.successStories} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#e6f0f2] text-[#2e6d7e] px-2 py-1 rounded-full hover:bg-[#d1e9e0] transition-colors">
                          Success Stories
                        </a>}
                      {resources.communityForum && <a href={resources.communityForum} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#e6f0f2] text-[#2e6d7e] px-2 py-1 rounded-full hover:bg-[#d1e9e0] transition-colors">
                          Community Forum
                        </a>}
                      {resources.implementationGuide && <a href={resources.implementationGuide} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#e6f0f2] text-[#2e6d7e] px-2 py-1 rounded-full hover:bg-[#d1e9e0] transition-colors">
                          Implementation Guide
                        </a>}
                      {resources.bestPractices && <a href={resources.bestPractices} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#e6f0f2] text-[#2e6d7e] px-2 py-1 rounded-full hover:bg-[#d1e9e0] transition-colors">
                          Best Practices
                        </a>}
                      {resources.valueCalculator && <a href={resources.valueCalculator} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#e6f0f2] text-[#2e6d7e] px-2 py-1 rounded-full hover:bg-[#d1e9e0] transition-colors">
                          Value Calculator
                        </a>}
                      {resources.training && <a href={resources.training} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#e6f0f2] text-[#2e6d7e] px-2 py-1 rounded-full hover:bg-[#d1e9e0] transition-colors">
                          Training Resources
                        </a>}
                    </div>
                  </div>
                </div>
              </div>
            </div>;
      })}
      </div>
      <div className="mt-6 bg-white p-5 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium text-[#293e40] mb-3">
          Additional ServiceNow Resources
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://www.servicenow.com/now-platform.html" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-[#f8fcfa] transition-colors">
            <div className="mr-3 bg-[#edf7f4] p-2 rounded-full">
              <BookOpenIcon className="h-5 w-5 text-[#81b5a1]" />
            </div>
            <div>
              <h5 className="font-medium text-[#293e40]">
                Now Platform Overview
              </h5>
              <p className="text-xs text-gray-500">
                Explore the foundation of all ServiceNow products
              </p>
            </div>
          </a>
          <a href="https://developer.servicenow.com/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-[#f8fcfa] transition-colors">
            <div className="mr-3 bg-[#edf7f4] p-2 rounded-full">
              <BookOpenIcon className="h-5 w-5 text-[#81b5a1]" />
            </div>
            <div>
              <h5 className="font-medium text-[#293e40]">Developer Portal</h5>
              <p className="text-xs text-gray-500">
                Access free developer instances and learning resources
              </p>
            </div>
          </a>
          <a href="https://www.servicenow.com/services/training-and-certification.html" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-[#f8fcfa] transition-colors">
            <div className="mr-3 bg-[#edf7f4] p-2 rounded-full">
              <BookOpenIcon className="h-5 w-5 text-[#81b5a1]" />
            </div>
            <div>
              <h5 className="font-medium text-[#293e40]">
                Training & Certification
              </h5>
              <p className="text-xs text-gray-500">
                Build expertise with official ServiceNow training
              </p>
            </div>
          </a>
          <a href="https://www.servicenow.com/success.html" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-[#f8fcfa] transition-colors">
            <div className="mr-3 bg-[#edf7f4] p-2 rounded-full">
              <BookOpenIcon className="h-5 w-5 text-[#81b5a1]" />
            </div>
            <div>
              <h5 className="font-medium text-[#293e40]">
                Customer Success Center
              </h5>
              <p className="text-xs text-gray-500">
                Access best practices and implementation resources
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>;
};