import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '../Common/Button';
import { ExternalLinkIcon, InfoIcon, TrendingUpIcon } from 'lucide-react';
import { useAssessment } from '../../context/AssessmentContext';
interface Module {
  id: string;
  name: string;
  priority: number;
}
interface ROICalculatorProps {
  modules: Module[];
}
export const ROICalculator = ({
  modules
}: ROICalculatorProps) => {
  const {
    answers
  } = useAssessment();
  const topModules = modules.slice(0, 3);
  const [inputs, setInputs] = useState({
    employeeCost: 75000,
    employeeCount: 100,
    incidentCount: 500,
    incidentResolutionTime: 4,
    downtime: 24
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };
  // Calculate ROI metrics based on user inputs
  const calculateMetrics = () => {
    // These are simplified calculations for demonstration purposes
    const hourlyRate = inputs.employeeCost / 2080; // Annual salary divided by work hours in a year
    const currentCosts = {
      incidentResolution: inputs.incidentCount * inputs.incidentResolutionTime * hourlyRate,
      downtime: inputs.downtime * inputs.employeeCount * hourlyRate * 0.5,
      manualProcesses: inputs.employeeCount * hourlyRate * 3 * 52 // 3 hours per week per employee on manual tasks
    };
    // Estimated improvements with ServiceNow
    const projectedSavings = {
      incidentResolution: currentCosts.incidentResolution * 0.4,
      downtime: currentCosts.downtime * 0.5,
      manualProcesses: currentCosts.manualProcesses * 0.6 // 60% reduction
    };
    const totalCurrentCost = Object.values(currentCosts).reduce((sum, cost) => sum + cost, 0);
    const totalSavings = Object.values(projectedSavings).reduce((sum, saving) => sum + saving, 0);
    // Estimate implementation costs based on module priorities
    const implementationCost = topModules.reduce((total, module) => {
      // Very rough estimates based on priority
      const moduleCost = module.priority === 1 ? 100000 : module.priority === 2 ? 75000 : 50000;
      return total + moduleCost;
    }, 0);
    // Calculate ROI over 3 years
    const threeYearSavings = totalSavings * 3;
    const roi = (threeYearSavings - implementationCost) / implementationCost * 100;
    return {
      currentCosts,
      projectedSavings,
      totalCurrentCost,
      totalSavings,
      implementationCost,
      threeYearSavings,
      roi,
      paybackPeriod: implementationCost / totalSavings
    };
  };
  const metrics = calculateMetrics();
  // Chart data
  const chartData = [{
    name: 'Year 1',
    'Current Costs': metrics.totalCurrentCost,
    'With ServiceNow': metrics.totalCurrentCost - metrics.totalSavings,
    Savings: metrics.totalSavings
  }, {
    name: 'Year 2',
    'Current Costs': metrics.totalCurrentCost,
    'With ServiceNow': metrics.totalCurrentCost - metrics.totalSavings,
    Savings: metrics.totalSavings
  }, {
    name: 'Year 3',
    'Current Costs': metrics.totalCurrentCost,
    'With ServiceNow': metrics.totalCurrentCost - metrics.totalSavings,
    Savings: metrics.totalSavings
  }];
  // ServiceNow ROI resources
  const roiResources = [{
    title: 'ServiceNow Value Calculator',
    description: 'Interactive tool to estimate potential ROI for your organization',
    url: 'https://www.servicenow.com/lpebk/it-business-management-value-calculator.html'
  }, {
    title: 'Value Management Office',
    description: "Learn about ServiceNow's approach to measuring and realizing value",
    url: 'https://www.servicenow.com/services/customer-success-center/value-realization.html'
  }, {
    title: 'Forrester Total Economic Impact Studies',
    description: 'Independent research on the ROI of ServiceNow solutions',
    url: 'https://www.servicenow.com/resources-roi.html'
  }, {
    title: 'Customer Success Stories',
    description: 'Real-world ROI examples from ServiceNow customers',
    url: 'https://www.servicenow.com/customers.html'
  }];
  // Get tailored ROI insights based on assessment answers
  const getRoiInsights = () => {
    const insights = [];
    // Check if they have incident response issues
    if (answers.some(a => a.questionId === 'incident_response' && ['day', 'days', 'week_plus'].includes(a.value as string))) {
      insights.push({
        title: 'Incident Resolution Impact',
        content: "Your organization's incident resolution times indicate significant potential for cost savings. ServiceNow customers typically see 45-60% faster resolution times, directly impacting productivity and customer satisfaction.",
        source: 'Forrester Research: The Total Economic Impact™ of ServiceNow IT Service Management',
        url: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/analyst-report/ar-forrester-tei-itsm.pdf'
      });
    }
    // Check if they have service disruption issues
    if (answers.some(a => a.questionId === 'service_disruptions' && typeof a.value === 'number' && a.value > 3)) {
      insights.push({
        title: 'Service Availability Value',
        content: 'With your frequent service disruptions, implementing ServiceNow ITOM can reduce outages by up to 60%, translating to approximately $1M in annual savings for mid-sized organizations through improved availability.',
        source: 'ServiceNow IT Operations Management Business Value Study',
        url: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/white-paper/wp-forrester-tei-itom.pdf'
      });
    }
    // Check if they have integration issues
    if (answers.some(a => a.questionId === 'tool_integration' && ['minimal_integration', 'complete_silos'].includes(a.value as string))) {
      insights.push({
        title: 'Integration ROI',
        content: "Your siloed systems represent a significant efficiency opportunity. Organizations implementing ServiceNow's unified platform typically reduce integration costs by 65% and improve cross-functional productivity by 20%.",
        source: 'IDC Business Value Study: ServiceNow Platform',
        url: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/analyst-report/ar-state-of-work.pdf'
      });
    }
    // Add a general insight if no specific ones apply
    if (insights.length === 0) {
      insights.push({
        title: 'ServiceNow Value Realization',
        content: 'Organizations implementing ServiceNow typically see a 195% ROI over three years with a payback period of under 6 months, primarily through automation of manual processes and improved service delivery.',
        source: 'Forrester Total Economic Impact Study',
        url: 'https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/resource-center/analyst-report/ar-forrester-tei-platform.pdf'
      });
    }
    return insights;
  };
  const roiInsights = getRoiInsights();
  return <div>
      <h3 className="text-xl font-semibold text-[#293e40] mb-4">
        ROI Calculator
      </h3>
      <div className="mb-6">
        <p className="text-gray-600">
          Estimate your potential return on investment by adjusting the
          parameters below to match your organization.
        </p>
      </div>
      {/* ROI Insights based on assessment */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
        <h4 className="text-lg font-medium text-[#293e40] mb-3 flex items-center">
          <TrendingUpIcon className="h-5 w-5 mr-2 text-[#81b5a1]" />
          Tailored ROI Insights
        </h4>
        <div className="space-y-4">
          {roiInsights.map((insight, index) => <div key={index} className="bg-[#f8fcfa] p-3 rounded-md border border-[#e6f0f2]">
              <h5 className="font-medium text-[#293e40] text-sm">
                {insight.title}
              </h5>
              <p className="mt-1 text-sm text-gray-600">{insight.content}</p>
              <div className="mt-2 flex items-center text-xs text-[#2e6d7e]">
                <InfoIcon className="h-3 w-3 mr-1" />
                <span>Source: </span>
                <a href={insight.url} target="_blank" rel="noopener noreferrer" className="ml-1 underline hover:text-[#81b5a1] inline-flex items-center">
                  {insight.source}
                  <ExternalLinkIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>)}
        </div>
      </div>
      {/* Input parameters */}
      <div className="bg-[#f8fcfa] rounded-lg p-6 mb-8 border border-gray-100">
        <h4 className="text-lg font-medium text-[#293e40] mb-4">
          Organization Parameters
        </h4>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="employeeCost" className="block text-sm font-medium text-[#293e40]">
              Average Employee Cost (Annual)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input type="number" name="employeeCost" id="employeeCost" value={inputs.employeeCost} onChange={handleInputChange} className="focus:ring-[#81b5a1] focus:border-[#81b5a1] block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" />
            </div>
          </div>
          <div>
            <label htmlFor="employeeCount" className="block text-sm font-medium text-[#293e40]">
              Number of Employees
            </label>
            <input type="number" name="employeeCount" id="employeeCount" value={inputs.employeeCount} onChange={handleInputChange} className="focus:ring-[#81b5a1] focus:border-[#81b5a1] block w-full sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="incidentCount" className="block text-sm font-medium text-[#293e40]">
              Monthly Incidents/Tickets
            </label>
            <input type="number" name="incidentCount" id="incidentCount" value={inputs.incidentCount} onChange={handleInputChange} className="focus:ring-[#81b5a1] focus:border-[#81b5a1] block w-full sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="incidentResolutionTime" className="block text-sm font-medium text-[#293e40]">
              Average Resolution Time (Hours)
            </label>
            <input type="number" name="incidentResolutionTime" id="incidentResolutionTime" value={inputs.incidentResolutionTime} onChange={handleInputChange} className="focus:ring-[#81b5a1] focus:border-[#81b5a1] block w-full sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="downtime" className="block text-sm font-medium text-[#293e40]">
              Monthly Downtime Hours
            </label>
            <input type="number" name="downtime" id="downtime" value={inputs.downtime} onChange={handleInputChange} className="focus:ring-[#81b5a1] focus:border-[#81b5a1] block w-full sm:text-sm border-gray-300 rounded-md" />
          </div>
        </div>
      </div>
      {/* ROI Results */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h4 className="text-lg font-medium text-[#293e40]">
            3-Year ROI Projection
          </h4>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">
                Estimated Annual Savings
              </p>
              <p className="mt-1 text-3xl font-semibold text-[#81b5a1]">
                ${Math.round(metrics.totalSavings).toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">3-Year ROI</p>
              <p className="mt-1 text-3xl font-semibold text-[#2e6d7e]">
                {Math.round(metrics.roi)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">
                Payback Period
              </p>
              <p className="mt-1 text-3xl font-semibold text-[#293e40]">
                {metrics.paybackPeriod.toFixed(1)} months
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Cost Comparison Chart */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h4 className="text-lg font-medium text-[#293e40]">
            3-Year Cost Comparison
          </h4>
        </div>
        <div className="px-6 py-5">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={value => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="Current Costs" fill="#9CA3AF" />
                <Bar dataKey="With ServiceNow" fill="#2e6d7e" />
                <Bar dataKey="Savings" fill="#81b5a1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* ServiceNow ROI Resources */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-medium text-[#293e40]">
            ServiceNow ROI Resources
          </h4>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roiResources.map((resource, index) => <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="block p-4 border border-gray-100 rounded-md hover:bg-[#f8fcfa] transition-colors">
                <h5 className="font-medium text-[#293e40] flex items-center">
                  {resource.title}
                  <ExternalLinkIcon className="ml-1 h-4 w-4 text-[#81b5a1]" />
                </h5>
                <p className="mt-1 text-sm text-gray-500">
                  {resource.description}
                </p>
              </a>)}
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <Button>Download Detailed ROI Report</Button>
      </div>
    </div>;
};