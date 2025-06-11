export const questions = [{
  id: 'manual_processes',
  type: 'open-ended',
  question: 'What critical business processes currently rely heavily on manual effort?',
  description: 'Please describe the manual processes that take up significant time and resources.',
  placeholder: 'For example: IT support ticket routing, employee onboarding, financial approvals...'
}, {
  id: 'bottlenecks',
  type: 'multiple-choice',
  question: 'Which operational bottlenecks cause the greatest impact on productivity?',
  description: 'Select all that apply to your organization.',
  multiSelect: true,
  options: [{
    value: 'it_support',
    label: 'IT support request backlogs'
  }, {
    value: 'asset_management',
    label: 'Inefficient asset tracking and management'
  }, {
    value: 'change_management',
    label: 'Slow change management processes'
  }, {
    value: 'incident_resolution',
    label: 'Delayed incident resolution'
  }, {
    value: 'cross_dept_communication',
    label: 'Poor cross-department communication'
  }, {
    value: 'approval_workflows',
    label: 'Complex approval workflows'
  }]
}, {
  id: 'service_disruptions',
  type: 'scale',
  question: 'How frequently does your organization experience IT service disruptions?',
  min: 1,
  max: 5,
  minLabel: 'Rarely (quarterly)',
  maxLabel: 'Constantly (daily)'
}, {
  id: 'leadership_visibility',
  type: 'scale',
  question: 'What level of insight does leadership have into IT operational performance?',
  min: 1,
  max: 5,
  minLabel: 'Very limited visibility',
  maxLabel: 'Complete transparency'
}, {
  id: 'tool_integration',
  type: 'multiple-choice',
  question: 'Are your current tools fully integrated, or do they function in silos?',
  options: [{
    value: 'fully_integrated',
    label: 'Fully integrated ecosystem'
  }, {
    value: 'partial_integration',
    label: 'Some integration between key systems'
  }, {
    value: 'minimal_integration',
    label: 'Minimal integration with manual data transfer'
  }, {
    value: 'complete_silos',
    label: 'Complete silos with no integration'
  }]
}, {
  id: 'incident_response',
  type: 'multiple-choice',
  question: 'How quickly can your team respond to critical incidents currently?',
  options: [{
    value: 'minutes',
    label: 'Within minutes'
  }, {
    value: 'hours',
    label: 'Within hours'
  }, {
    value: 'day',
    label: 'Within a day'
  }, {
    value: 'days',
    label: 'Multiple days'
  }, {
    value: 'week_plus',
    label: 'A week or longer'
  }]
}, {
  id: 'automation_priority',
  type: 'multiple-choice',
  question: 'Which departments or processes could significantly benefit from automation?',
  description: 'Select up to 3 areas where automation would provide the most value.',
  multiSelect: true,
  options: [{
    value: 'it_service',
    label: 'IT Service Management'
  }, {
    value: 'hr',
    label: 'Human Resources'
  }, {
    value: 'finance',
    label: 'Finance & Procurement'
  }, {
    value: 'operations',
    label: 'Operations'
  }, {
    value: 'customer_service',
    label: 'Customer Service'
  }, {
    value: 'facilities',
    label: 'Facilities Management'
  }]
}, {
  id: 'compliance_visibility',
  type: 'scale',
  question: 'How would you rate your visibility into compliance risks and mitigation efforts?',
  min: 1,
  max: 5,
  minLabel: 'Poor visibility',
  maxLabel: 'Complete visibility'
}];